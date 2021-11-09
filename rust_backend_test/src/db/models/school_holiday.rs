use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use chrono::NaiveDate;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::schema::school_holidays;
use crate::db::util::last_insert_rowid;

#[derive(Queryable, Debug)]
pub struct SchoolHoliday {
    pub id: i32,
    pub state_id: i32,
    pub type_id: i32,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub comment: Option<String>,
}

impl Display for SchoolHoliday {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<SchoolHoliday {} in {}>", self.type_id, self.state_id)
        } else {
            write!(
                f,
                "<SchoolHoliday {} in {} (Start Date: {} | End Date: {} | Comment {:?} | ID: {})>",
                self.type_id,
                self.state_id,
                self.start_date,
                self.end_date,
                self.comment,
                self.id
            )
        }
    }
}

impl SchoolHoliday {
    pub fn new<'a>(
        state_id: &'a i32,
        type_id: &'a i32,
        start_date: &'a NaiveDate,
        end_date: &'a NaiveDate,
        comment: Option<&'a str>,
    ) -> NewSchoolHoliday<'a> {
        NewSchoolHoliday {
            state_id,
            type_id,
            start_date,
            end_date,
            comment,
        }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "school_holidays"]
pub struct NewSchoolHoliday<'a> {
    pub state_id: &'a i32,
    pub type_id: &'a i32,
    pub start_date: &'a NaiveDate,
    pub end_date: &'a NaiveDate,
    pub comment: Option<&'a str>,
}

impl Display for NewSchoolHoliday<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<SchoolHoliday {} in {}>", self.type_id, self.state_id)
        } else {
            write!(
                f,
                "<SchoolHoliday {} in {} (Start Date: {} | End Date: {} | Comment {:?})>",
                self.type_id, self.state_id, self.start_date, self.end_date, self.comment
            )
        }
    }
}

impl NewSchoolHoliday<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(school_holidays::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}
