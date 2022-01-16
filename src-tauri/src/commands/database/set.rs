use diesel::prelude::*;

use crate::commands::CommandResult;
use crate::db::conversion;
use crate::db::models::SchoolHolidayLink;
use crate::db::state_models::{self, UpdatedVacations, Vacation};
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
    new_entries: Option<Vec<state_models::PublicHoliday>>,
    updated_entries: Option<state_models::PublicHolidays>,
    removed_entries: Option<Vec<i32>>,
    filter_current_year: Option<bool>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<(state_models::PublicHolidays, u32)> {
    use crate::db::schema::public_holidays::dsl::{id, public_holidays};

    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match conn
        .exclusive_transaction::<(state_models::PublicHolidays, u32), DieselResultErrorWrapper, _>(
            || {
                if new_entries.is_some() {
                    let new_entries = new_entries.unwrap();
                    let insertable = conversion::public_holiday::to_new_db_model(&new_entries);
                    if let Err(err) = diesel::insert_into(public_holidays)
                        .values(insertable.clone())
                        .execute(&conn)
                    {
                        error!(
                            target = "database",
                            message = "Failed to insert entries to public_holidays db table",
                            error = ?err,
                            entry = ?insertable
                        );
                        return Err(DieselResultErrorWrapper::Msg(
                            "database-insert-error".into(),
                        ));
                    }
                }

                if updated_entries.is_some() {
                    let updated_entries = updated_entries.unwrap();
                    let insertables =
                        conversion::public_holiday::to_update_db_model(updated_entries);
                    for insertable in insertables {
                        if let Err(err) = diesel::update(public_holidays.filter(id.eq(insertable.id)))
                            .set(insertable.clone())
                            .execute(&conn)
                        {
                            error!(
                                target = "database",
                                message = "Failed to update entries in public_holidays db table",
                                error = ?err,
                                entry = ?insertable
                            );
                            return Err(DieselResultErrorWrapper::Msg(
                                "database-update-error".into(),
                            ));
                        }
                    }
                }

                if removed_entries.is_some() {
                    let removed_entries = removed_entries.unwrap();
                    for removed_entry in removed_entries {
                        if let Err(err) = diesel::delete(public_holidays.filter(id.eq(removed_entry))).execute(&conn) {
                            error!(
                                target = "database",
                                message = "Failed to delete all entries from public_holidays db table",
                                error = ?err,
                            );
                            return Err(DieselResultErrorWrapper::Msg(
                                "database-delete-error".into(),
                            ));
                        }
                    }
                }

                match _load_public_holidays(&config_state_guard, &conn, filter_current_year) {
                    Err(err) => Err(DieselResultErrorWrapper::Msg(err)),
                    Ok(v) => Ok(v),
                }
            },
        ) {
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
            debug!(target = "database", message = "Set public holidays in db");
            Ok(rv)
        }
    }
}

/// Update [`SchoolHoliday`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_school_holidays(
    new_entries: Option<Vec<state_models::SchoolHoliday>>,
    updated_entries: Option<state_models::SchoolHolidays>,
    removed_entries: Option<Vec<i32>>,
    filter_current_year: Option<bool>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::SchoolHolidays> {
    use crate::db::schema::school_holidays::dsl::{id, school_holidays};

    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match conn.exclusive_transaction::<state_models::SchoolHolidays, DieselResultErrorWrapper, _>(
        || {
            if new_entries.is_some() {
                let new_entries = new_entries.unwrap();
                let (insertable, errors) =
                    conversion::school_holiday::to_new_db_model(&new_entries);
                if errors > 0 {
                    return Err(DieselResultErrorWrapper::Msg("invaild-data-error".into()));
                }
                if let Err(err) = diesel::insert_into(school_holidays)
                    .values(insertable.clone())
                    .execute(&conn)
                {
                    error!(
                        target = "database",
                        message = "Failed to insert entries to school_holidays db table",
                        error = ?err,
                        entry = ?insertable
                    );
                    return Err(DieselResultErrorWrapper::Msg(
                        "database-insert-error".into(),
                    ));
                }
            }

            if updated_entries.is_some() {
                let updated_entries = updated_entries.unwrap();
                let (insertables, errors) =
                    conversion::school_holiday::to_update_db_model(updated_entries);
                if errors > 0 {
                    return Err(DieselResultErrorWrapper::Msg("invaild-data-error".into()));
                }
                for insertable in insertables {
                    if let Err(err) = diesel::update(school_holidays.filter(id.eq(insertable.id)))
                        .set(insertable.clone())
                        .execute(&conn)
                    {
                        error!(
                            target = "database",
                            message = "Failed to update entries in school_holidays db table",
                            error = ?err,
                            entry = ?insertable
                        );
                        return Err(DieselResultErrorWrapper::Msg(
                            "database-update-error".into(),
                        ));
                    }
                }
            }

            if removed_entries.is_some() {
                let removed_entries = removed_entries.unwrap();
                for removed_entry in removed_entries {
                    if let Err(err) =
                        diesel::delete(school_holidays.filter(id.eq(removed_entry))).execute(&conn)
                    {
                        error!(
                            target = "database",
                            message = "Failed to delete all entries from school_holidays db table",
                            error = ?err,
                        );
                        return Err(DieselResultErrorWrapper::Msg(
                            "database-delete-error".into(),
                        ));
                    }
                }
            }

            match _load_school_holidays(&config_state_guard, &conn, filter_current_year) {
                Err(err) => Err(DieselResultErrorWrapper::Msg(err)),
                Ok(v) => Ok(v),
            }
        },
    ) {
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
            debug!(target = "database", message = "Set school holidays in db");
            Ok(rv)
        }
    }
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
    new_entries: Option<Vec<state_models::User>>,
    updated_entries: Option<state_models::Users>,
    removed_entries: Option<Vec<i32>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::Users> {
    use crate::db::schema::users::dsl::{id, users};

    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match conn.exclusive_transaction::<state_models::Users, DieselResultErrorWrapper, _>(|| {
        if new_entries.is_some() {
            let new_entries = new_entries.unwrap();
            let insertable = conversion::user::to_new_db_model(&new_entries);
            if let Err(err) = diesel::insert_into(users)
                .values(insertable.clone())
                .execute(&conn)
            {
                error!(
                    target = "database",
                    message = "Failed to insert entries to users db table",
                    error = ?err,
                    entry = ?insertable
                );
                return Err(DieselResultErrorWrapper::Msg(
                    "database-insert-error".into(),
                ));
            }
        }

        if updated_entries.is_some() {
            let updated_entries = updated_entries.unwrap();
            let insertables = conversion::user::to_update_db_model(updated_entries);
            for insertable in insertables {
                if let Err(err) = diesel::update(users.filter(id.eq(insertable.id)))
                    .set(insertable.clone())
                    .execute(&conn)
                {
                    error!(
                        target = "database",
                        message = "Failed to update entries in users db table",
                        error = ?err,
                        entry = ?insertable
                    );
                    return Err(DieselResultErrorWrapper::Msg(
                        "database-update-error".into(),
                    ));
                }
            }
        }

        if removed_entries.is_some() {
            let removed_entries = removed_entries.unwrap();
            for removed_entry in removed_entries {
                if let Err(err) = diesel::delete(users.filter(id.eq(removed_entry))).execute(&conn)
                {
                    error!(
                        target = "database",
                        message = "Failed to delete all entries from users db table",
                        error = ?err,
                    );
                    return Err(DieselResultErrorWrapper::Msg(
                        "database-delete-error".into(),
                    ));
                }
            }
        }

        match _load_users(&conn) {
            Err(err) => Err(DieselResultErrorWrapper::Msg(err)),
            Ok(v) => Ok(v),
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
            debug!(target = "database", message = "Set users in db");
            Ok(rv)
        }
    }
}

/// Update [`Vacation`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_vacations(
    new_entries: Option<(i32, Vec<Vacation>)>,
    updated_entries: Option<UpdatedVacations>,
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
    new_entries: Option<Vec<state_models::VacationType>>,
    updated_entries: Option<state_models::VacationTypes>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<state_models::VacationTypes> {
    use crate::db::schema::vacation_types::dsl::{id, vacation_types};

    let config_state_guard = config_state.0.lock();
    let conn = get_db_conn(&config_state_guard.settings.database_uri)?;

    match conn.exclusive_transaction::<state_models::VacationTypes, DieselResultErrorWrapper, _>(
        || {
            if new_entries.is_some() {
                let new_entries = new_entries.unwrap();
                let insertable = conversion::vacation_type::to_new_db_model(&new_entries);
                if let Err(err) = diesel::insert_into(vacation_types)
                    .values(insertable.clone())
                    .execute(&conn)
                {
                    error!(
                        target = "database",
                        message = "Failed to insert entries to vacation_types db table",
                        error = ?err,
                        entry = ?insertable
                    );
                    return Err(DieselResultErrorWrapper::Msg(
                        "database-insert-error".into(),
                    ));
                }
            }

            if updated_entries.is_some() {
                let updated_entries = updated_entries.unwrap();
                let insertables = conversion::vacation_type::to_update_db_model(updated_entries);
                for insertable in insertables {
                    if let Err(err) = diesel::update(vacation_types.filter(id.eq(insertable.id)))
                        .set(insertable.clone())
                        .execute(&conn)
                    {
                        error!(
                            target = "database",
                            message = "Failed to update entries in vacation_types db table",
                            error = ?err,
                            entry = ?insertable
                        );
                        return Err(DieselResultErrorWrapper::Msg(
                            "database-update-error".into(),
                        ));
                    }
                }
            }

            match _load_vacation_types(&conn) {
                Err(err) => Err(DieselResultErrorWrapper::Msg(err)),
                Ok(v) => Ok(v),
            }
        },
    ) {
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
            debug!(target = "database", message = "Set vacation types in db");
            Ok(rv)
        }
    }
}
