use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::schema::setups;
use crate::db::util::last_insert_rowid;

#[derive(Queryable, Debug)]
pub struct Setup {
    pub id: i32,
    pub year: i32,
    pub state_id: i32,
}

impl Display for Setup {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<Setup {} for {}>", self.year, self.state_id)
        } else {
            write!(
                f,
                "<Setup {} for {} (ID: {})>",
                self.year, self.state_id, self.id
            )
        }
    }
}

impl Setup {
    pub fn new<'a>(year: &'a i32, state_id: &'a i32) -> NewSetup<'a> {
        NewSetup { year, state_id }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "setups"]
pub struct NewSetup<'a> {
    pub year: &'a i32,
    pub state_id: &'a i32,
}

impl Display for NewSetup<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "<Setup {} for {}>", self.year, self.state_id)
    }
}

impl NewSetup<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(setups::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}
