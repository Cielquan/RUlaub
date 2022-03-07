use std::path;

use diesel::Connection;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum NoDBFileError {
    #[error("Database file not found")]
    Msg,
}

/// Try to establish a connection to the given database.
///
/// Create a new database if `create` is `true` and no file is found.
pub fn establish_connection_to(
    db_url: &str,
    create: bool,
) -> anyhow::Result<diesel::SqliteConnection> {
    debug!(target = "database-connection", message = "Connect to database", db_url = ?db_url);

    if !path::Path::new(db_url).exists() {
        if !create {
            error!(
                target = "database-connection",
                message = "No database file found; creation set to false; abort",
                db_url = ?db_url
            );
            return Err(NoDBFileError::Msg.into());
        } else {
            info!(
                target = "database-connection",
                message = "No database file found; create new database",
                db_url = ?db_url
            );
        }
    }

    match diesel::SqliteConnection::establish(db_url) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            error!(
                taget = "database-connection",
                message = "Failed to connect to database",
                error = ?err,
                db_url = ?db_url
            );
            Err(err.into())
        }
    }
}
