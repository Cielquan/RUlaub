use std::collections::HashMap;

use super::super::models;
use super::super::state_models::types::DateData;
use super::super::state_models::{self, SchoolHoliday};
use super::date_type::naive_date_to_iso_date;

pub fn to_state_model(db_data: Vec<models::SchoolHoliday>) -> state_models::SchoolHolidays {
    trace!(
        target = "database-data",
        message = "Convert db entries for SchoolHoliday to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        map.insert(
            entry.id,
            SchoolHoliday {
                name: entry.name.clone(),
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
