use crate::commands::CommandResult;

/// Create a new SQLite database for RUlaub.
#[tracing::instrument]
#[tauri::command]
pub async fn create_db(path: String) -> CommandResult<()> {
    Ok(())
}

/// Check if the database is functional and up-to-date.
#[tracing::instrument]
#[tauri::command]
pub async fn check_db() -> CommandResult<()> {
    Ok(())
}
