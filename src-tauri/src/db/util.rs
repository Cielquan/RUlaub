use diesel::prelude::*;

/// Try to establish a connection to the given database.
pub fn establish_connection_to(db_url: &str) -> anyhow::Result<SqliteConnection> {
    trace!(target = "database", message = "Connect to database", db_url = ?db_url);
    match SqliteConnection::establish(db_url) {
        Ok(conn) => Ok(conn),
        Err(err) => {
            error!(taget="database", message="Failed to connect to database.", error=?err);
            Err(err.into())
        }
    }
}

no_arg_sql_function!(
    last_insert_rowid,
    diesel::sql_types::Integer,
    "Represents the SQL last_insert_row() function"
);
