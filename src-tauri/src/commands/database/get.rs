use diesel::prelude::*;

use crate::commands::database::get_db_conn;
use crate::commands::CommandResult;
use crate::config::Config;
use crate::db::conversion::{public_holiday, school_holiday, user, vacation, vacation_type};
use crate::db::models::{
    PublicHoliday, SchoolHoliday, SchoolHolidayLink, User, Vacation, VacationType,
};
use crate::db::state_models;
use crate::state::ConfigState;

fn _load_public_holidays(
    config: &Config,
    conn: &SqliteConnection,
) -> CommandResult<(state_models::PublicHolidays, u32)> {
    use crate::db::schema::public_holidays::dsl::public_holidays;

    let display_year = match config.settings.year_to_show.clone() {
        None => return Err("no-year-to-show-set-error".into()),
        Some(year) => year,
    };

    match public_holidays.load::<PublicHoliday>(conn) {
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

/// Get [`crate::db::models::PublicHoliday`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_public_holidays(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<(state_models::PublicHolidays, u32)> {
    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_public_holidays(&config_state_guard, &conn)
}

/// Get [`crate::db::models::SchoolHoliday`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_school_holidays(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::SchoolHolidays> {
    use crate::db::schema::school_holidays::dsl::school_holidays;

    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match school_holidays.load::<SchoolHoliday>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all SchoolHolidays from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(school_holiday::to_state(data)),
    }
}

/// Get [`crate::db::models::SchoolHolidayLink`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn get_school_holidays_link(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Option<String>> {
    use crate::db::schema::school_holidays_link::dsl::school_holidays_link;

    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match school_holidays_link.load::<SchoolHolidayLink>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load the SchoolHolidayLink from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => match data.len() {
            0 => Ok(None),
            1 => Ok(Some(data.get(0).unwrap().link.clone())),
            _ => Err("to-many-link-db-entries-error".into()),
        },
    }
}

/// Get [`crate::db::models::User`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_users(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::Users> {
    use crate::db::schema::users::dsl::users;

    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match users.load::<User>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Users from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(user::to_state(data)),
    }
}

/// Get [`crate::db::models::Vacation`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_vacations(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::Vacations> {
    use crate::db::schema::vacations::dsl::vacations;

    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match vacations.load::<Vacation>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Vacations from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(vacation::to_state(data)),
    }
}

/// Calc VacationStats from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_vacation_stats() -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Get [`crate::db::models::VacationType`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_vacation_types(
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::VacationTypes> {
    use crate::db::schema::vacation_types::dsl::vacation_types;

    let config_state_guard = config_state.0.lock();

    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match vacation_types.load::<VacationType>(&conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all VacationTypes from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(vacation_type::to_state(data)),
    }
}
