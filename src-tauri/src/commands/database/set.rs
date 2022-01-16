use crate::commands::CommandResult;
use crate::db::state_models::{
    PublicHoliday, PublicHolidays, SchoolHoliday, SchoolHolidays, User, Users, Vacation,
    VacationType, VacationTypes, Vacations,
};
use crate::state::ConfigState;

/// Update [`PublicHoliday`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_public_holidays(
    new_entries: Option<Vec<PublicHoliday>>,
    updated_entries: Option<PublicHolidays>,
    removed_entries: Option<Vec<String>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Update [`SchoolHoliday`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_school_holidays(
    new_entries: Option<Vec<SchoolHoliday>>,
    updated_entries: Option<SchoolHolidays>,
    removed_entries: Option<Vec<String>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Update [`SchoolHolidayLink`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_school_holidays_link(
    link: Option<String>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Option<()>> {
    Ok(Some(()))
}

/// Update [`User`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_users(
    new_entries: Option<Vec<User>>,
    updated_entries: Option<Users>,
    removed_entries: Option<Vec<String>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Update [`Vacation`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_vacations(
    new_entries: Option<Vec<Vacation>>,
    updated_entries: Option<Vacations>,
    removed_entries: Option<Vec<String>>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Vec<()>> {
    Ok(vec![()])
}

/// Update [`VacationType`] in database.
#[tracing::instrument(skip(config_state))]
#[tauri::command]
pub async fn update_vacation_types(
    new_entries: Option<Vec<VacationType>>,
    updated_entries: Option<VacationTypes>,
    config_state: tauri::State<'_, ConfigState>,
) -> CommandResult<Vec<()>> {
    Ok(vec![()])
}
