use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use chrono::NaiveDate;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::{schema::school_holidays, util::last_insert_rowid};

/// The database model for school holidays.
#[derive(Queryable, Debug)]
pub struct SchoolHoliday {
    pub id: i32,
    pub name: String,
    pub start_date: NaiveDate,
    pub start_year_day: i32,
    pub start_year: i32,
    pub end_date: NaiveDate,
    pub end_year_day: i32,
    pub end_year: i32,
}

impl Display for SchoolHoliday {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<SchoolHoliday {}>", self.name)
        } else {
            write!(
                f,
                "<SchoolHoliday {} (Start Date: {} | End Date: {} | ID: {})>",
                self.name, self.start_date, self.end_date, self.id
            )
        }
    }
}

impl SchoolHoliday {
    #[allow(clippy::new_ret_no_self)]
    pub fn new<'a>(
        name: &'a str,
        start_date: &'a NaiveDate,
        start_year_day: &'a i32,
        start_year: &'a i32,
        end_date: &'a NaiveDate,
        end_year_day: &'a i32,
        end_year: &'a i32,
    ) -> NewSchoolHoliday<'a> {
        NewSchoolHoliday {
            name,
            start_date,
            start_year_day,
            start_year,
            end_date,
            end_year_day,
            end_year,
        }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "school_holidays"]
pub struct NewSchoolHoliday<'a> {
    pub name: &'a str,
    pub start_date: &'a NaiveDate,
    pub start_year_day: &'a i32,
    pub start_year: &'a i32,
    pub end_date: &'a NaiveDate,
    pub end_year_day: &'a i32,
    pub end_year: &'a i32,
}

impl Display for NewSchoolHoliday<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<SchoolHoliday {}>", self.name)
        } else {
            write!(
                f,
                "<SchoolHoliday {} (Start Date: {} | End Date: {})>",
                self.name, self.start_date, self.end_date
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
