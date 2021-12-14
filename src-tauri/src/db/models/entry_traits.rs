use diesel::prelude::{RunQueryDsl, SqliteConnection};
use diesel::query_builder::InsertStatement;
use diesel::query_dsl::methods::ExecuteDsl;
use diesel::query_dsl::LoadQuery;
use diesel::{Insertable, Table};

use crate::db::sql_functions::last_insert_rowid;

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
        if let Err(err) = diesel::insert_into(<Self>::TABLE)
            .values(self.clone())
            .execute(conn)
        {
            error!(
                target = "new_db_entry",
                message = "Failed to add entry to db",
                error = ?err,
                entry = ?self
            );
            return Err(err.into());
        }

        trace!(
            target: "new_db_entry",
            message = "Get `last_insert_rowid` for new entry",
            entry = ?self
        );
        match diesel::select(last_insert_rowid).get_result::<i32>(conn) {
            Err(err) => {
                error!(
                    target = "new_db_entry",
                    message = "Failed to get id for new entry",
                    error = ?err,
                    entry = ?self
                );
                return Err(err.into());
            }
            Ok(id) => {
                debug!(
                    target: "new_db_entry",
                    message = "Got ID for new entry",
                    id = id,
                    entry = ?self
                );
                Ok(id)
            }
        }
    }
}
