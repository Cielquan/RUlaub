use std::collections::HashMap;

use crate::db::{models, state_models};

pub fn to_state_model(db_data: Vec<models::VacationType>) -> state_models::VacationTypes {
    trace!(
        target = "database-data",
        message = "Convert db entries for VacationType to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        map.insert(
            entry.id,
            state_models::VacationType {
                name: entry.name.clone(),
                charge: entry.charge,
                color_dark: entry.color_dark.clone(),
                color_light: entry.color_light.clone(),
                active: entry.active,
            },
        );
    }

    map
}

pub fn to_new_db_model(
    new_entries: &Vec<state_models::VacationType>,
) -> Vec<models::NewVacationType> {
    trace!(
        target = "database-data",
        message = "Convert new state data to VacationType db models",
    );

    let mut db_models = Vec::new();

    for entry in new_entries {
        db_models.push(models::VacationType::create_new_entry(
            &entry.name,
            &entry.charge,
            &entry.color_dark,
            &entry.color_light,
            &entry.active,
        ))
    }

    db_models
}

pub fn to_update_db_model(
    updated_entries: state_models::VacationTypes,
) -> Vec<models::VacationType> {
    trace!(
        target = "database-data",
        message = "Convert updated state data to VacationType db models",
    );

    let mut db_models = Vec::new();

    for (id, entry) in updated_entries {
        db_models.push(models::VacationType::create_update_entry(
            id,
            entry.name,
            entry.charge,
            entry.color_dark,
            entry.color_light,
            entry.active,
        ))
    }

    db_models
}
