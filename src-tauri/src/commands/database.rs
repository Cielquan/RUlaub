//! Commands for working with the database
pub mod external;
pub mod get;
pub mod set;

use thiserror::Error;

use super::CommandResult;
use crate::db;

fn get_db_conn(database_uri: &Option<String>) -> CommandResult<diesel::SqliteConnection> {
    let db_uri = match database_uri.clone() {
        None => return Err("database-not-set-error".into()),
        Some(db_uri) => db_uri,
    };

    match db::establish_connection_to(&db_uri, false) {
        Err(_) => Err("database-connection-error".into()),
        Ok((conn, _)) => Ok(conn),
    }
}

#[derive(Error, Debug)]
enum DieselResultErrorWrapper {
    #[error("{0}")]
    Msg(String),
    #[error("Diesel-Error-Dummy")]
    DieselErrorDummy(#[from] diesel::result::Error),
}

pub type DatabaseCommandResult<T, I = ()> = CommandResult<DatabaseCmdOk<T, I>>;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DatabaseCmdOk<T, I = ()> {
    data: T,
    additional_info: Option<I>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ErrInfo {
    error_count: u32,
}
