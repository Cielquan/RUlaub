use crate::commands::CommandResult;

/// Get [`crate::db::models::PublicHoliday`] from database.
#[tracing::instrument]
#[tauri::command]
pub async fn load_public_holidays() -> CommandResult<Vec<()>> {
    Ok(vec![()])
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
