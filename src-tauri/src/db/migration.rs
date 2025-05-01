use crate::db;

/// Migrate the database to the latest state
pub fn migrate_db_schema(db_url: &str, create: bool, add_defaults: bool) -> anyhow::Result<bool> {
    debug!(
        target = "database-migration",
        message = "Start database migration routine"
    );

    let is_new = match db::establish_connection_to(db_url, create) {
        Err(err) => {
            error!(
                target = "database-migration",
                message = "Failed to create db connection for migration",
            );
            return Err(err.into());
        }
        Ok((conn, new)) => {
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
            if add_defaults {
                if let Err(err) = db::defaults::add_default_values_to_db(&conn) {
                    error!(
                        target = "database-migration",
                        message = "Failed to add default values to the database",
                        error = ?err
                    );
                    return Err(err.into());
                } else {
                    info!(
                        target = "database-migration",
                        message = "Added default values to the database"
                    );
                }
            }
            new
        }
    };
    debug!(
        target = "database-migration",
        message = "Finished database migration routine"
    );
    Ok(is_new)
}
