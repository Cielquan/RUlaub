use std::collections::HashMap;

use super::date_type::{iso_date_to_naive_date, naive_date_to_iso_date};
use crate::db::{models, state_models};

pub fn to_state_model(db_data: Vec<models::SchoolHoliday>) -> state_models::SchoolHolidays {
    trace!(
        target = "database-data",
        message = "Convert db entries for SchoolHoliday to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        map.insert(
            entry.id,
            state_models::SchoolHoliday {
                name: entry.name.clone(),
                start: state_models::types::DateData {
                    date: naive_date_to_iso_date(entry.start_date),
                    year_day: entry.start_year_day,
                    year: entry.start_year,
                },
                end: state_models::types::DateData {
                    date: naive_date_to_iso_date(entry.end_date),
                    year_day: entry.end_year_day,
                    year: entry.end_year,
                },
            },
        );
    }

    map
}

pub fn to_new_db_model(
    new_entries: &Vec<state_models::SchoolHoliday>,
) -> (Vec<models::NewSchoolHoliday>, u32) {
    trace!(
        target = "database-data",
        message = "Convert new state data to SchoolHoliday db models",
    );

    let mut error_count = 0;
    let mut db_models = Vec::new();

    for entry in new_entries {
        let start_date = match iso_date_to_naive_date(entry.start.date.clone()) {
            Err(_) => {
                error_count += 1;
                continue;
            }
            Ok(date) => date,
        };
        let end_date = match iso_date_to_naive_date(entry.end.date.clone()) {
            Err(_) => {
                error_count += 1;
                continue;
            }
            Ok(date) => date,
        };

        db_models.push(models::SchoolHoliday::create_new_entry(
            &entry.name,
            start_date,
            &entry.start.year_day,
            &entry.start.year,
            end_date,
            &entry.end.year_day,
            &entry.end.year,
        ))
    }

    if error_count > 0 {
        debug!(
            target = "database-data",
            message = "Encounterd erros while converting new state data to SchoolHoliday db models",
            error_count = error_count,
        );
    }

    (db_models, error_count)
}

pub fn to_update_db_model(
    updated_entries: state_models::SchoolHolidays,
) -> (Vec<models::SchoolHoliday>, u32) {
    trace!(
        target = "database-data",
        message = "Convert updated state data to SchoolHoliday db models",
    );

    let mut error_count = 0;
    let mut db_models = Vec::new();

    for (id, entry) in updated_entries {
        let start_date = match iso_date_to_naive_date(entry.start.date) {
            Err(_) => {
                error_count += 1;
                continue;
            }
            Ok(date) => date,
        };
        let end_date = match iso_date_to_naive_date(entry.end.date) {
            Err(_) => {
                error_count += 1;
                continue;
            }
            Ok(date) => date,
        };

        db_models.push(models::SchoolHoliday::create_update_entry(
            id,
            entry.name,
            start_date,
            entry.start.year_day,
            entry.start.year,
            end_date,
            entry.end.year_day,
            entry.end.year,
        ))
    }

    if error_count > 0 {
        debug!(
            target = "database-data",
            message =
                "Encounterd erros while converting updated state data to SchoolHoliday db models",
            error_count = error_count,
        );
    }

    (db_models, error_count)
}
