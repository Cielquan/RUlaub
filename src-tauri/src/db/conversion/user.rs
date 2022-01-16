use std::collections::HashMap;

use super::super::models;
use super::super::state_models::user::Workdays;
use super::super::state_models::{self, User};

pub fn to_state_model(db_data: Vec<models::User>) -> state_models::Users {
    trace!(
        target = "database-data",
        message = "Convert db entries for User to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        map.insert(
            entry.id,
            User {
                name: entry.name.clone(),
                workdays: Workdays {
                    monday: entry.monday,
                    tuesday: entry.tuesday,
                    wednesday: entry.wednesday,
                    thursday: entry.thursday,
                    friday: entry.friday,
                    saturday: entry.saturday,
                    sunday: entry.sunday,
                },
                available_vacation_days: entry.vacation_days,
            },
        );
    }

    map
}
