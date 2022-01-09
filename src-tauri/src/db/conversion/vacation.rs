use std::collections::HashMap;

use super::super::models;
use crate::db::state_models::types::{naive_date_to_iso_date, DateData};
use crate::db::state_models::{self, Vacation};

pub fn to_state(db_data: Vec<models::Vacation>) -> state_models::Vacations {
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
