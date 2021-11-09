use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use chrono::NaiveDate;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::schema::public_holidays;
use crate::db::util::last_insert_rowid;

#[derive(Queryable, Debug)]
pub struct PublicHoliday {
    pub id: i32,
    pub state_id: i32,
    pub name: String,
    pub date: NaiveDate,
}

impl Display for PublicHoliday {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<PublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                "<PublicHoliday {} (date: {} | State-ID: {} | ID: {})>",
                self.name, self.state_id, self.date, self.id
            )
        }
    }
}

impl PublicHoliday {
    pub fn new<'a>(
        state_id: &'a i32,
        name: &'a str,
        date: &'a NaiveDate,
    ) -> NewPublicHoliday<'a> {
        NewPublicHoliday {
            state_id,
            name,
            date,
        }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "public_holidays"]
pub struct NewPublicHoliday<'a> {
    pub state_id: &'a i32,
    pub name: &'a str,
    pub date: &'a NaiveDate,
}

impl Display for NewPublicHoliday<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewPublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                "<NewPublicHoliday {} (date: {} | State-ID: {})>",
                self.name, self.date, self.state_id
            )
        }
    }
}

impl NewPublicHoliday<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(public_holidays::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}
