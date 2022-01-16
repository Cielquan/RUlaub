use diesel::prelude::RunQueryDsl;

use crate::commands::CommandResult;
use crate::db::models::SchoolHolidayLink;
use crate::db::state_models::{
    self, PublicHoliday, PublicHolidays, SchoolHoliday, SchoolHolidays, User, Users, Vacation,
    VacationType, VacationTypes, Vacations,
};
use crate::state::ConfigState;

use super::get::{
    _get_school_holidays_link, _load_public_holidays, _load_school_holidays, _load_users,
    _load_vacation_types, _load_vacations,
};
use super::{get_db_conn, DieselResultErrorWrapper};

/// Update [`PublicHoliday`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_public_holidays(
    new_entries: Option<Vec<PublicHoliday>>,
    updated_entries: Option<PublicHolidays>,
    removed_entries: Option<Vec<String>>,
    filter_current_year: Option<bool>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<(state_models::PublicHolidays, u32)> {
    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_public_holidays(&config_state_guard, &conn, filter_current_year)
}

/// Update [`SchoolHoliday`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_school_holidays(
    new_entries: Option<Vec<SchoolHoliday>>,
    updated_entries: Option<SchoolHolidays>,
    removed_entries: Option<Vec<String>>,
    filter_current_year: Option<bool>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::SchoolHolidays> {
    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_school_holidays(&config_state_guard, &conn, filter_current_year)
}

/// Update [`SchoolHolidayLink`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_school_holidays_link(
    link: Option<String>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Option<String>> {
    use crate::db::schema::school_holidays_link::dsl::school_holidays_link;

    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match conn.exclusive_transaction::<Option<String>, DieselResultErrorWrapper, _>(|| {
        let current_entry = match _get_school_holidays_link(&conn) {
            Err(err) => {
                return Err(DieselResultErrorWrapper::Msg(err.into()));
            }
            Ok(e) => e,
        };

        if current_entry.is_none() && link.is_none() {
            return Ok(None);
        }

        if current_entry.is_none() {
            let link = link.unwrap();
            let insertable = SchoolHolidayLink::create_new_entry(&link);
            if let Err(err) = diesel::insert_into(school_holidays_link)
                .values(insertable.clone())
                .execute(&conn)
            {
                error!(
                    target = "database",
                    message = "Failed to insert entry to school_holidays_link db table",
                    error = ?err,
                    entry = ?insertable
                );
                return Err(DieselResultErrorWrapper::Msg(
                    "database-insert-error".into(),
                ));
            }
            return Ok(Some(link));
        } else if current_entry.is_some() && link.is_none() {
            if let Err(err) = diesel::delete(school_holidays_link).execute(&conn) {
                error!(
                    target = "database",
                    message = "Failed to delete all entries from school_holidays_link db table",
                    error = ?err,
                );
                return Err(DieselResultErrorWrapper::Msg(
                    "database-delete-error".into(),
                ));
            }
            return Ok(None);
        } else {
            let link = link.unwrap();
            let insertable = SchoolHolidayLink::create_update_entry(link.clone());
            if let Err(err) = diesel::update(school_holidays_link)
                .set(insertable.clone())
                .execute(&conn)
            {
                error!(
                    target = "database",
                    message = "Failed to update entry in school_holidays_link db table",
                    error = ?err,
                    entry = ?insertable
                );
                return Err(DieselResultErrorWrapper::Msg(
                    "database-update-error".into(),
                ));
            }
            return Ok(Some(link));
        }
    }) {
        Err(DieselResultErrorWrapper::Msg(err)) => Err(err),
        Err(DieselResultErrorWrapper::DieselErrorDummy(err)) => {
            error!(
                target = "database-diesel-error",
                message = "An diesel error slipped through",
                error = ?err,
            );
            panic!("Unexpected error slipped through; see loggs for more info");
        }
        Ok(rv) => {
            debug!(
                target = "database",
                message = "Set school holiday link in db",
                value = ?rv,
            );
            Ok(rv)
        }
    }
}

/// Update [`User`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_users(
    new_entries: Option<Vec<User>>,
    updated_entries: Option<Users>,
    removed_entries: Option<Vec<String>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::Users> {
    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_users(&conn)
}

/// Update [`Vacation`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_vacations(
    new_entries: Option<(i32, Vec<Vacation>)>,
    updated_entries: Option<Vacations>,
    removed_entries: Option<Vec<String>>,
    filter_current_year: Option<bool>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::Vacations> {
    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_vacations(&config_state_guard, &conn, filter_current_year)
}

/// Update [`VacationType`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_vacation_types(
    new_entries: Option<Vec<VacationType>>,
    updated_entries: Option<VacationTypes>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::VacationTypes> {
    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_vacation_types(&conn)
}
