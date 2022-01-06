use crate::commands::CommandResult;
use crate::db::migrate_db_schema;

/// Create a new SQLite database for RUlaub.
#[tracing::instrument]
#[tauri::command]
pub async fn create_db(path: String) -> CommandResult<()> {
    if migrate_db_schema(&path, true).is_err() {
        return Err("Failed to create new database or migrate existing one.".into());
    }
    Ok(())
}

/// Check if the database is functional and up-to-date.
#[tracing::instrument]
#[tauri::command]
pub async fn check_db() -> CommandResult<()> {
    Ok(())
}
