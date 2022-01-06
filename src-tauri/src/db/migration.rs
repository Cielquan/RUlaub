use std::path::Path;

use diesel_migrations::run_pending_migrations;

use super::establish_connection_to;

/// Migrate the database to the latest state
pub fn migrate_db_schema(db_url: &str, create: bool) {
    debug!(
        target = "database-migration",
        message = "Start database migration routine"
    );
    if !Path::new(db_url).exists() {
        if !create {
            error!(
                target = "database-migration",
                message = "No database file found; creation not set; abort"
            );
        } else {
            info!(target = "database-migration", message = "Create new database");
        }
    }
    match establish_connection_to(db_url) {
        Err(_) => {
            error!(
                target = "database-migration",
                message = "Failed to create db connection for migration",
            );
        }
        Ok(conn) => {
            if let Err(err) = run_pending_migrations(&conn) {
                error!(
                    target = "database-migration",
                    message = "Failed to migrate the database",
                    error = ?err
                );
            } else {
                info!(target = "database-migration", message = "Ran pending migrations");
            }
        }
    }    
    debug!(
        target = "database-migration",
        message = "Finished database migration routine"
    );
}
