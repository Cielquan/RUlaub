use std::path;

use crate::db;

/// Migrate the database to the latest state
pub fn migrate_db_schema(db_url: &str, create: bool) -> anyhow::Result<()> {
    debug!(
        target = "database-migration",
        message = "Start database migration routine"
    );
    if !path::Path::new(db_url).exists() {
        if !create {
            warn!(
                target = "database-migration",
                message = "No database file found; creation not set; abort"
            );
            return Ok(());
        } else {
            info!(
                target = "database-migration",
                message = "Create new database"
            );
        }
    }
    match db::establish_connection_to(db_url) {
        Err(err) => {
            error!(
                target = "database-migration",
                message = "Failed to create db connection for migration",
            );
            return Err(err);
        }
        Ok(conn) => {
            if let Err(err) = diesel_migrations::run_pending_migrations(&conn) {
                error!(
                    target = "database-migration",
                    message = "Failed to migrate the database",
                    error = ?err
                );
                return Err(err.into());
            } else {
                info!(
                    target = "database-migration",
                    message = "Ran pending migrations"
                );
            }
        }
    }
    debug!(
        target = "database-migration",
        message = "Finished database migration routine"
    );
    Ok(())
}
