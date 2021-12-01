use diesel::prelude::{Connection, RunQueryDsl, SqliteConnection};
use diesel::query_builder::InsertStatement;
use diesel::query_dsl::methods::ExecuteDsl;
use diesel::query_dsl::LoadQuery;
use diesel::{Insertable, Table};

/// Try to establish a connection to the given database.
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

no_arg_sql_function!(
    last_insert_rowid,
    diesel::sql_types::Integer,
    "Represents the SQL last_insert_row() function"
);

pub trait NewDBEntry<T>
where
    Self: std::fmt::Debug + Insertable<T> + Clone,
    T: Table,
{
    const TABLE: T;

    #[tracing::instrument(skip(self, conn))]
    fn save_to_db(self, conn: &SqliteConnection) -> anyhow::Result<i32>
    where
        InsertStatement<T, <Self as Insertable<T>>::Values>:
            ExecuteDsl<SqliteConnection> + LoadQuery<SqliteConnection, Self>,
    {
        debug!(target: "new_db_entry", message = "Adding to db", entry = ?self);
        diesel::insert_into(<Self>::TABLE)
            .values(self.clone())
            .execute(conn)?;

        trace!(target: "new_db_entry", message = "Get `last_insert_rowid` for new entry", entry = ?self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", message = "Got ID for new entry", id = id, entry = ?self);
        Ok(id)
    }
}
