use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::schema::school_holiday_types;
use crate::db::util::last_insert_rowid;

#[derive(Queryable, Debug)]
pub struct SchoolHolidayType {
    pub id: i32,
    pub name: String,
}

impl Display for SchoolHolidayType {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<SchoolHolidayType {}>", self.name)
        } else {
            write!(f, "<SchoolHolidayType {} (ID: {})>", self.name, self.id)
        }
    }
}

impl SchoolHolidayType {
    pub fn new(name: &str) -> NewSchoolHolidayType {
        NewSchoolHolidayType { name }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "school_holiday_types"]
pub struct NewSchoolHolidayType<'a> {
    pub name: &'a str,
}

impl Display for NewSchoolHolidayType<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "<NewSchoolHolidayType {}>", self.name)
    }
}

impl NewSchoolHolidayType<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(school_holiday_types::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}
