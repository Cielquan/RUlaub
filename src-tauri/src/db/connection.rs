use diesel::Connection;

/// Try to establish a connection to the given database.
pub fn establish_connection_to(db_url: &str) -> anyhow::Result<diesel::SqliteConnection> {
    debug!(target = "database", message = "Connect to database", db_url = ?db_url);
    match diesel::SqliteConnection::establish(db_url) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            error!(
                taget = "database",
                message = "Failed to connect to database",
                error = ?err,
                db_url = ?db_url
            );
            Err(err.into())
        }
    }
}
