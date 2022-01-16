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

pub fn to_new_db_model(new_entries: &Vec<state_models::User>) -> Vec<models::NewUser> {
    trace!(
        target = "database-data",
        message = "Convert new state data to User db models",
    );

    let mut db_models = Vec::new();

    for entry in new_entries {
        db_models.push(models::User::create_new_entry(
            &entry.name,
            &entry.available_vacation_days,
            &entry.workdays.monday,
            &entry.workdays.tuesday,
            &entry.workdays.wednesday,
            &entry.workdays.thursday,
            &entry.workdays.friday,
            &entry.workdays.saturday,
            &entry.workdays.sunday,
        ))
    }

    db_models
}

pub fn to_update_db_model(updated_entries: state_models::Users) -> Vec<models::User> {
    trace!(
        target = "database-data",
        message = "Convert updated state data to User db models",
    );

    let mut db_models = Vec::new();

    for (id, entry) in updated_entries {
        db_models.push(models::User::create_update_entry(
            id,
            entry.name,
            entry.available_vacation_days,
            entry.workdays.monday,
            entry.workdays.tuesday,
            entry.workdays.wednesday,
            entry.workdays.thursday,
            entry.workdays.friday,
            entry.workdays.saturday,
            entry.workdays.sunday,
        ))
    }

    db_models
}
