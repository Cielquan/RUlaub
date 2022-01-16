use std::collections::HashMap;

use crate::db::conversion::date_type::iso_date_to_naive_date;

use super::super::models;
use super::super::state_models::types::DateData;
use super::super::state_models::{self, Vacation};
use super::date_type::naive_date_to_iso_date;

pub fn to_state_model(db_data: Vec<models::Vacation>) -> state_models::Vacations {
    trace!(
        target = "database-data",
        message = "Convert db entries for Vacation to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        if !map.contains_key(&entry.user_id) {
            map.insert(entry.user_id, HashMap::new());
        }

        let vac_map = map.get_mut(&entry.user_id).unwrap();
        vac_map.insert(
            entry.id,
            Vacation {
                type_id: entry.vacation_type_id,
                start: DateData {
                    date: naive_date_to_iso_date(entry.start_date),
                    year_day: entry.start_year_day,
                    year: entry.start_year,
                },
                end: DateData {
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
    new_entries: &(i32, Vec<state_models::Vacation>),
) -> (Vec<models::NewVacation>, u32) {
    trace!(
        target = "database-data",
        message = "Convert new state data to Vacation db models",
    );

    let mut error_count = 0;
    let mut db_models = Vec::new();

    for entry in &new_entries.1 {
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

        db_models.push(models::Vacation::create_new_entry(
            &new_entries.0,
            &entry.type_id,
            start_date,
            &entry.start.year_day,
            &entry.start.year,
            end_date,
            &entry.end.year_day,
            &entry.end.year,
        ))
    }

    (db_models, error_count)
}

pub fn to_update_db_model(
    updated_entries: state_models::UpdatedVacations,
) -> (Vec<models::UpdatedVacation>, u32) {
    trace!(
        target = "database-data",
        message = "Convert updated state data to Vacation db models",
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

        db_models.push(models::Vacation::create_update_entry(
            id,
            entry.type_id,
            start_date,
            entry.start.year_day,
            entry.start.year,
            end_date,
            entry.end.year_day,
            entry.end.year,
        ))
    }

    (db_models, error_count)
}
