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
) -> commands::CommandResult<(state_models::SchoolHolidays, u32, u32, u32)> {
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

    let data = download_school_holidays(&link)?;

    match conn
        .exclusive_transaction::<(state_models::SchoolHolidays, u32, u32, u32), super::DieselResultErrorWrapper, _>(
            || {
                let current_data = match super::get::_load_school_holidays(&config_state_guard, &conn, Some(true)) {
                    Err(err) => return Err(super::DieselResultErrorWrapper::Msg(err)),
                    Ok(data) => data,
                };

                let (new_entries, errors, in_db, doubles) = make_school_holidays_insertable(data, current_data);

                match super::set::_update_school_holidays(
                    &config_state_guard,
                    &conn,
                    Some(new_entries),
                    None,
                    None,
                    Some(true),
                ) {
                    Ok(rv) => Ok((rv, errors, in_db, doubles)),
                    Err(err) => Err(super::DieselResultErrorWrapper::Msg(err)),
                }
            },
        ) {
        Err(super::DieselResultErrorWrapper::Msg(err)) => Err(err),
        Err(super::DieselResultErrorWrapper::DieselErrorDummy(err)) => {
            error!(
                target = "database-diesel-error",
                message = "An diesel error slipped through",
                error = ?err,
            );
            panic!("Unexpected error slipped through; see loggs for more info");
        }
        Ok(rv) => {
            debug!(target = "database", message = "Set school holidays in db");
            Ok(rv)
        }
    }
}

#[derive(Debug, Deserialize)]
struct SchoolHolidayAPIJSONModel {
    holiday: String,
    start: String,
    end: String,
}

fn download_school_holidays(link: &str) -> commands::CommandResult<Vec<SchoolHolidayAPIJSONModel>> {
    let handle = tauri::async_runtime::handle();

    let response = match handle.block_on(reqwest::get(link)) {
        Ok(response) => response,
        Err(err) => {
            error!(
                target = "download-database-data",
                message = "Error while trying to request data from school holiday link",
                link = ?link,
                err = ?err,
            );
            return Err("request-on-school-holidays-link-error".into());
            // return Err("invalid-response-school-holidays-link-error".into());
        }
    };

    if !response.status().is_success() {
        error!(
            target = "download-database-data",
            message = "Got non ok status code from request to school holiday link",
            status = ?response.status(),
            link = ?link,
        );
        return Err("non-ok-status-school-holidays-link-error".into());
    }

    match handle.block_on(response.json()) {
        Ok(data) => data,
        Err(err) => {
            error!(
                target = "download-database-data",
                message = "Error while loading data from school holiday link into struct",
                err = ?err,
            );
            return Err("load-school-holidays-link-json-error".into());
        }
    }
}

fn make_school_holidays_insertable(
    downloaded_data: Vec<SchoolHolidayAPIJSONModel>,
    current_data: state_models::SchoolHolidays,
) -> (Vec<state_models::SchoolHoliday>, u32, u32, u32) {
    trace!(
        target = "download-database-data",
        message = "Convert downloaded SchoolHolidays data to state data",
    );

    let mut new_entries = Vec::new();
    let mut error_count: u32 = 0;
    let mut in_db_count: u32 = 0;
    let mut double_count: u32 = 0;

    let current_data_list: Vec<state_models::SchoolHoliday> = current_data.into_values().collect();

    for entry in downloaded_data.iter() {
        let start_date = match iso_date_to_naive_date(entry.start.clone()) {
            Ok(date) => date,
            Err(err) => {
                error!(
                    target = "download-database-data",
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
                    target = "download-database-data",
                    message = "Downloaded school holiday data entry has invalid end date",
                    entry = ?entry,
                    err = ?err,
                );
                error_count += 1;
                continue;
            }
        };

        let new_entry = state_models::SchoolHoliday {
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
        };

        if current_data_list.contains(&new_entry) {
            warn!(
                target = "download-database-data",
                message = "School holiday data entry already in database; skipping",
                entry = ?new_entry,
            );
            in_db_count += 1;
            continue;
        }

        if new_entries.contains(&new_entry) {
            warn!(
                target = "download-database-data",
                message = "School holiday data entry already is double; skipping",
                entry = ?new_entry,
            );
            double_count += 1;
            continue;
        }

        new_entries.push(new_entry);
    }

    if error_count > 0 {
        debug!(
            target = "download-database-data",
            message = "Encounterd erros while parsing downloaded school holiday data",
            error_count = error_count,
        );
    }

    (new_entries, error_count, in_db_count, double_count)
}
