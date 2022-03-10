use crate::db::state_models;
use crate::{commands, state};

/// Update [`crate::db::models::SchoolHoliday`] in database with external downloaded data.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn download_school_holidays_from_link(
    year: u32,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<state_models::SchoolHolidays> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;
    let link = super::get::_get_school_holidays_link(&conn);
    // return on error or None

    // download JSON from link and parse into model

    let new_entries: Vec<state_models::SchoolHoliday> = vec![];

    super::set::_update_school_holidays(
        &config_state_guard,
        &conn,
        Some(new_entries),
        None,
        None,
        Some(true),
    )
}
