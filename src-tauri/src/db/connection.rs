use diesel::prelude::{Connection, SqliteConnection};

/// Try to establish a connection to the given database.
#[allow(dead_code)] // TODO:#i# remove after usage
pub fn establish_connection_to(db_url: &str) -> anyhow::Result<SqliteConnection> {
    debug!(target = "database", message = "Connect to database", db_url = ?db_url);
    match SqliteConnection::establish(db_url) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            error!(taget="database", message="Failed to connect to database.", error=?err);
            Err(err.into())
        }
    }
}
