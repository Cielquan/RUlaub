use diesel::prelude::*;

use crate::commands::CommandResult;
use crate::db::conversion::public_holiday;
use crate::db::models::PublicHoliday;
use crate::db::{establish_connection_to, state_models};
use crate::state::ConfigState;

/// Get [`crate::db::models::PublicHoliday`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_public_holidays(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<(state_models::PublicHolidays, u32)> {
    use crate::db::schema::public_holidays::dsl::public_holidays;

    let config_state_guard = config_state.0.lock();

    let display_year = match config_state_guard.settings.year_to_show.clone() {
        None => return Err("no-year-to-show-set-error".into()),
        Some(year) => year,
    };

    let db_uri = match config_state_guard.settings.database_uri.clone() {
        None => return Err("no-database-set-error".into()),
        Some(db_uri) => db_uri,
    };

    let conn = match establish_connection_to(&db_uri) {
        Err(_) => return Err("database-connection-error".into()),
        Ok(connection) => connection,
    };

    match public_holidays.load::<PublicHoliday>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all PublicHolidays from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(public_holiday::to_state(data, display_year)),
    }
}

/// Get [`crate::db::models::SchoolHoliday`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_school_holidays() -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Get [`crate::db::models::SchoolHolidayLink`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn get_school_holidays_link() -> CommandResult<Option<()>> {
    Ok(Some(()))
}

/// Get [`crate::db::models::User`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_users() -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Get [`crate::db::models::Vacation`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_vacations() -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Get [`crate::db::models::VacationType`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_vacation_types() -> CommandResult<Vec<()>> {
    Ok(vec![()])
}
