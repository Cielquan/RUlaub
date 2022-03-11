use chrono::Datelike;

use crate::db::conversion::date_type::{iso_date_to_naive_date, naive_date_to_iso_date};
use crate::db::state_models;
use crate::{commands, state};

/// Update [`crate::db::models::SchoolHoliday`] in database with external downloaded data.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn download_school_holidays_from_link(
    year: u32,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<(state_models::SchoolHolidays, u32)> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;
    let link_db_entry = match super::get::_get_school_holidays_link(&conn)? {
        Some(link) => link,
        None => {
            error!(target = "database", message = "No SchoolHolidayLink set");
            return Err("no-school-holidays-link-set-error".into());
        }
    };

    let link = link_db_entry.replace("%year%", &year.to_string());

    let handle = tauri::async_runtime::handle();

    let response = match handle.block_on(reqwest::get(link.clone())) {
        Ok(response) => response,
        Err(err) => {
            error!(
                target = "database-data",
                message = "Error while trying to request data from school holiday link",
                link = ?link,
                err = ?err,
            );
            return Err("request-on-school-holidays-link-error".into());
            // return Err("invalid-response-school-holidays-link-error".into());
        }
    };

    let data: Vec<SchoolHolidayAPIJSONModel> = match handle.block_on(response.json()) {
        Ok(data) => data,
        Err(err) => {
            error!(
                target = "database-data",
                message = "Error while loading data from school holiday link into struct",
                err = ?err,
            );
            return Err("load-school-holidays-link-json-error".into());
        }
    };

    let (new_entries, errors) = convert_data_to_state_model(data);

    match super::set::_update_school_holidays(
        &config_state_guard,
        &conn,
        Some(new_entries),
        None,
        None,
        Some(true),
    ) {
        Ok(rv) => Ok((rv, errors)),
        Err(err) => Err(err),
    }
}

#[derive(Debug, Deserialize)]
struct SchoolHolidayAPIJSONModel {
    holiday: String,
    start: String,
    end: String,
}

fn convert_data_to_state_model(
    downloaded_data: Vec<SchoolHolidayAPIJSONModel>,
) -> (Vec<state_models::SchoolHoliday>, u32) {
    trace!(
        target = "database-data",
        message = "Convert downloaded SchoolHolidays data to state data",
    );

    let mut map = Vec::new();
    let mut error_count: u32 = 0;

    for entry in downloaded_data.iter() {
        let start_date = match iso_date_to_naive_date(entry.start.clone()) {
            Ok(date) => date,
            Err(err) => {
                error!(
                    target = "database-data",
                    message = "Downloaded school holiday data entry has invalid start date",
                    entry = ?entry,
                    err = ?err,
                );
                error_count += 1;
                continue;
            }
        };
        let end_date = match iso_date_to_naive_date(entry.end.clone()) {
            Ok(date) => date,
            Err(err) => {
                error!(
                    target = "database-data",
                    message = "Downloaded school holiday data entry has invalid end date",
                    entry = ?entry,
                    err = ?err,
                );
                error_count += 1;
                continue;
            }
        };

        map.push(state_models::SchoolHoliday {
            name: entry.holiday.clone(),
            start: state_models::types::DateData {
                date: naive_date_to_iso_date(start_date),
                year_day: start_date.ordinal().try_into().unwrap(),
                year: start_date.year(),
            },
            end: state_models::types::DateData {
                date: naive_date_to_iso_date(end_date),
                year_day: end_date.ordinal().try_into().unwrap(),
                year: end_date.year(),
            },
        });
    }

    if error_count > 0 {
        debug!(
            target = "database-data",
            message = "Encounterd erros while parsing downloaded school holiday data",
            error_count = error_count,
        );
    }

    (map, error_count)
}
