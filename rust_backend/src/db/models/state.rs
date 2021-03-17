use std::fmt::{self, Display, Formatter};

use diesel::prelude::*;
use diesel::result::Error;
use tracing::{debug, instrument, trace};

use super::super::{schema::states, util::last_insert_rowid};

#[derive(Queryable, Debug)]
pub struct State {
    pub id: i32,
    pub state_abbr: String,
    pub state_full: String,
}

impl State {
    pub fn new<'a>(state_abbr: &'a str, state_full: &'a str) -> NewState<'a> {
        NewState {
            state_abbr,
            state_full,
        }
    }
}

impl Display for State {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<State {}>", self.state_full)
        } else {
            write!(
                f,
                "<State {} (Abbr: {} | ID: {})>",
                self.state_full, self.state_abbr, self.id
            )
        }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "states"]
pub struct NewState<'a> {
    pub state_abbr: &'a str,
    pub state_full: &'a str,
}

impl Display for NewState<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<State {}>", self.state_full)
        } else {
            write!(f, "<State {} (Abbr: {})>", self.state_full, self.state_abbr)
        }
    }
}

impl NewState<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32, Error> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(states::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn);
        debug!(target: "new_db_entry", "Got ID: <{:?}> for {:#}", id, &self);
        id
    }
}
