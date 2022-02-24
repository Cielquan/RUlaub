use std::collections::HashMap;

use chrono::NaiveDate;
use diesel::prelude::*;

use crate::db::{conversion, models, query_only_models, state_models};
use crate::{commands, config, date_calc, db, state};

/// Get [`crate::db::models::PublicHoliday`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_public_holidays(
    load_all_data: Option<bool>,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<(state_models::PublicHolidays, u32)> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_public_holidays(&config_state_guard, &conn, load_all_data)
}

pub fn _load_public_holidays(
    config: &config::Config,
    conn: &SqliteConnection,
    load_all_data: Option<bool>,
) -> commands::CommandResult<(state_models::PublicHolidays, u32)> {
    use crate::db::schema::public_holidays::dsl::{public_holidays, year};

    trace!(
        target = "database",
        message = "Catch public holiday data from the database",
        load_all_data = ?load_all_data,
    );

    let display_year = match config.settings.year_to_show.clone() {
        None => {
            error!(target = "database", message = "No year to show set");
            return Err("no-year-to-show-set-error".into());
        }
        Some(y) => y,
    };

    let mut query = public_holidays.into_boxed();
    if load_all_data != Some(true) {
        query = query
            .filter(year.eq(Some(display_year)))
            .or_filter(year.is_null());
    }

    match query.load::<models::PublicHoliday>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all PublicHolidays from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(db::conversion::public_holiday::to_state_model(
            data,
            display_year,
        )),
    }
}

/// Get [`crate::db::models::SchoolHoliday`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_school_holidays(
    load_all_data: Option<bool>,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<state_models::SchoolHolidays> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_school_holidays(&config_state_guard, &conn, load_all_data)
}

pub fn _load_school_holidays(
    config: &config::Config,
    conn: &SqliteConnection,
    load_all_data: Option<bool>,
) -> commands::CommandResult<state_models::SchoolHolidays> {
    use crate::db::schema::school_holidays::dsl::{end_year, school_holidays, start_year};

    let mut query = school_holidays.into_boxed();
    if load_all_data != Some(true) {
        let display_year = match config.settings.year_to_show.clone() {
            None => {
                error!(target = "database", message = "No year to show set");
                return Err("no-year-to-show-set-error".into());
            }
            Some(y) => y,
        };

        query = query
            .filter(start_year.eq(display_year).or(end_year.eq(display_year)))
            .or_filter(start_year.lt(display_year).and(end_year.gt(display_year)))
    }

    match query.load::<models::SchoolHoliday>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all SchoolHolidays from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(db::conversion::school_holiday::to_state_model(data)),
    }
}

/// Get [`crate::db::models::SchoolHolidayLink`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn get_school_holidays_link(
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<Option<String>> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _get_school_holidays_link(&conn)
}

pub fn _get_school_holidays_link(
    conn: &SqliteConnection,
) -> commands::CommandResult<Option<String>> {
    use crate::db::schema::school_holidays_link::dsl::school_holidays_link;

    match school_holidays_link.load::<models::SchoolHolidayLink>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load the SchoolHolidayLink from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(mut data) => match data.len() {
            0 => Ok(None),
            1 => Ok(Some(data.remove(0).link)),
            _ => {
                error!(
                    target = "database",
                    message = "Got too many entry for SchoolHolidayLink from the database",
                    count = ?data.len()
                );
                Err("to-many-link-db-entries-error".into())
            }
        },
    }
}

/// Get [`crate::db::models::User`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_users(
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<state_models::Users> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_users(&conn)
}

pub fn _load_users(conn: &SqliteConnection) -> commands::CommandResult<state_models::Users> {
    use crate::db::schema::users::dsl::users;

    match users.load::<models::User>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Users from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(db::conversion::user::to_state_model(data)),
    }
}

/// Get [`crate::db::models::Vacation`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_vacations(
    load_all_data: Option<bool>,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<state_models::Vacations> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_vacations(&config_state_guard, &conn, load_all_data)
}

pub fn _load_vacations(
    config: &config::Config,
    conn: &SqliteConnection,
    load_all_data: Option<bool>,
) -> commands::CommandResult<state_models::Vacations> {
    use crate::db::schema::vacations::dsl::{end_year, start_year, vacations};

    let mut query = vacations.into_boxed();
    if load_all_data != Some(true) {
        let display_year = match config.settings.year_to_show.clone() {
            None => {
                error!(target = "database", message = "No year to show set");
                return Err("no-year-to-show-set-error".into());
            }
            Some(y) => y,
        };

        query = query
            .filter(start_year.eq(display_year).or(end_year.eq(display_year)))
            .or_filter(start_year.lt(display_year).and(end_year.gt(display_year)))
    }

    match query.load::<models::Vacation>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Vacations from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(db::conversion::vacation::to_state_model(data)),
    }
}

/// Calc VacationStats from database.
///
/// The function queries the database 3 times in a row with different queries. Those queries are
/// not bundled by an explicit transaction and therefore a write by another client could result
/// in data "not matching". This case will not result in an error by the data processing code.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub fn load_vacation_stats(
    load_all_data: Option<bool>,
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<(state_models::VacationStatsMap, u32, u32)> {
    let config_state_guard = config_state.0.lock();

    let display_year = match config_state_guard.settings.year_to_show.clone() {
        None => {
            error!(target = "database", message = "No year to show set");
            return Err("no-year-to-show-set-error".into());
        }
        Some(y) => y,
    };
    let first_day = NaiveDate::from_ymd(display_year, 1, 1);
    let last_day = NaiveDate::from_ymd(display_year, 12, 31);

    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    let (pub_holidays, pub_holiday_error_count) =
        _load_public_holidays(&config_state_guard, &conn, Some(true))?;

    trace!(
        target = "database",
        message = "Build a list of dates from public holiday database data",
    );
    let mut pub_holiday_dates: Vec<NaiveDate> = pub_holidays
        .into_values()
        .map(|pub_holiday| {
            let year_day = match pub_holiday {
                state_models::PublicHolidayVariant::DateBasedHoliday(ph) => ph.calc.year_day,
                state_models::PublicHolidayVariant::EasterBasedHoliday(ph) => ph.calc.year_day,
            };
            NaiveDate::from_yo(display_year, year_day.try_into().unwrap())
        })
        .collect();
    pub_holiday_dates.sort();

    let user_list = _load_user_workdays(&conn)?;
    let mut user_workdays = conversion::vacation_stat::map_user_workdays_list(&user_list);

    let vacation_list = _load_vacations_with_types(&conn, display_year)?;
    let mut vacation_map = conversion::vacation_stat::group_vacations(vacation_list);

    let mut vac_stats: state_models::VacationStatsMap = HashMap::new();
    let mut vacation_error_count = 0;

    trace!(target = "database", message = "Calc user vacation stats");
    for user in user_list {
        let mut taken_vacation_days = 0;
        let mut vacation_stats = HashMap::new();

        let workdays = user_workdays.remove(&user.id).unwrap_or_default();
        let user_vac_data = vacation_map.remove(&user.id).unwrap_or_default();

        for (type_id, vacs) in user_vac_data {
            let mut type_count: u32 = 0;
            let mut charge = false;

            for vac in vacs {
                charge = vac.charge;

                let start_date = if vac.start_date >= first_day {
                    vac.start_date
                } else {
                    first_day.clone()
                };

                let end_date = if vac.end_date <= last_day {
                    vac.end_date
                } else {
                    last_day.clone()
                };

                match date_calc::sum_weekdays_between(
                    start_date,
                    end_date,
                    Some(pub_holiday_dates.clone()),
                ) {
                    None => {
                        vacation_error_count += 1;
                    }
                    Some(weekday_sum_map) => {
                        type_count += date_calc::sum_workdays(&weekday_sum_map, &workdays);
                    }
                }
            }

            vacation_stats.insert(type_id, type_count);
            if charge {
                taken_vacation_days += type_count;
            }
        }

        vac_stats.insert(
            user.id,
            state_models::vacation_stat::Stats {
                calc: state_models::vacation_stat::Calc {
                    taken_vacation_days,
                    vacation_stats,
                },
            },
        );
    }

    Ok((vac_stats, pub_holiday_error_count, vacation_error_count))
}

fn _load_user_workdays(
    conn: &SqliteConnection,
) -> commands::CommandResult<Vec<query_only_models::UserWorkdays>> {
    use crate::db::schema::users::dsl::{
        friday, id, monday, saturday, sunday, thursday, tuesday, users, wednesday,
    };

    trace!(
        target = "database",
        message = "Catch user workday data from the database",
    );

    match users
        .select((
            id, monday, tuesday, wednesday, thursday, friday, saturday, sunday,
        ))
        .load::<query_only_models::UserWorkdays>(conn)
    {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Users from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(data),
    }
}

fn _load_vacations_with_types(
    conn: &SqliteConnection,
    display_year: i32,
) -> commands::CommandResult<Vec<query_only_models::VacationWithType>> {
    use crate::db::schema::vacations::dsl::{end_year, start_year};
    use crate::db::schema::{vacation_types, vacations};

    trace!(
        target = "database",
        message = "Catch year vacation data including types from the database",
        year = display_year,
    );

    match vacations::table
        .inner_join(
            vacation_types::table.on(vacations::vacation_type_id
                .eq(vacation_types::id)
                .and(vacation_types::active)
                .eq(true)),
        )
        .select((
            vacations::user_id,
            vacations::vacation_type_id,
            vacations::start_date,
            vacations::end_date,
            vacation_types::charge,
        ))
        .filter(start_year.eq(display_year).or(end_year.eq(display_year)))
        .or_filter(start_year.lt(display_year).and(end_year.gt(display_year)))
        .load::<query_only_models::VacationWithType>(conn)
    {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all Vacations from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(data),
    }
}

/// Get [`crate::db::models::VacationType`] from database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn load_vacation_types(
    config_state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<state_models::VacationTypes> {
    let config_state_guard = config_state.0.lock();
    let conn = super::get_db_conn(&config_state_guard.settings.database_uri)?;

    _load_vacation_types(&conn)
}

pub fn _load_vacation_types(
    conn: &SqliteConnection,
) -> commands::CommandResult<state_models::VacationTypes> {
    use crate::db::schema::vacation_types::dsl::vacation_types;

    match vacation_types.load::<models::VacationType>(conn) {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to load all VacationTypes from the database",
                error = ?err
            );
            Err("database-load-error".into())
        }
        Ok(data) => Ok(db::conversion::vacation_type::to_state_model(data)),
    }
}
