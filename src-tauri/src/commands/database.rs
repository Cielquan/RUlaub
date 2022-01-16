//! Commands for working with the database
pub mod get;
pub mod set;

use diesel::SqliteConnection;
use thiserror::Error;

use crate::db::establish_connection_to;

use super::CommandResult;

fn get_db_conn(database_uri: &Option<String>) -> CommandResult<SqliteConnection> {
    let db_uri = match database_uri.clone() {
        None => return Err("no-database-set-error".into()),
        Some(db_uri) => db_uri,
    };

    match establish_connection_to(&db_uri) {
        Err(_) => return Err("database-connection-error".into()),
        Ok(connection) => Ok(connection),
    }
}

#[derive(Error, Debug)]
enum DieselResultErrorWrapper {
    #[error("{0}")]
    Msg(String),
    #[error("Diesel-Error-Dummy")]
    DieselErrorDummy(#[from] diesel::result::Error),
}
