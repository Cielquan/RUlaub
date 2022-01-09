use std::collections::HashMap;

use super::super::models;
use crate::db::state_models::{self, VacationType};

pub fn to_state(db_data: Vec<models::VacationType>) -> state_models::VacationTypes {
    trace!(
        target = "database-data",
        message = "Convert db entries for VacationType to state data",
    );

    let mut map = HashMap::new();

    for entry in db_data.iter() {
        map.insert(
            entry.id,
            VacationType {
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
