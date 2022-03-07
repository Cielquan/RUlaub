use crate::db;

#[derive(Debug, Clone, Copy, PartialEq, Serialize)]
pub enum DBSetupErr {
    None,
    DBErr,
    NoFileErr,
}

/// Initialize and migrate the DB file.
#[tracing::instrument]
pub fn setup_db(db_url: &str) -> Result<(), DBSetupErr> {
    trace!(
        target = "database",
        message = "Start database file check",
        db_url = db_url
    );

    match db::establish_connection_to(db_url, false) {
        Err(db::connection::DBConnectionError::NoDBFileError) => return Err(DBSetupErr::NoFileErr),
        Err(db::connection::DBConnectionError::ConnectionError(_)) => {
            return Err(DBSetupErr::DBErr)
        }
        Ok(_) => return Err(DBSetupErr::None),
    }
}
