use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::{schema::public_holidays, util::last_insert_rowid};

#[derive(Queryable, Debug)]
pub struct PublicHoliday {
    pub id: i32,
    pub name: String,
    pub year: Option<i32>,
    pub yearless_date: Option<String>,
    pub easter_sunday_offset: Option<i32>,
}

impl Display for PublicHoliday {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<PublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<PublicHoliday {}",
                    " (Yearless date: {:?}",
                    " | Easter sunday offset: {:?}",
                    " | Year: {:?}",
                    " | ID: {})>"
                ),
                self.name,
                self.yearless_date,
                self.easter_sunday_offset,
                self.year,
                self.id
            )
        }
    }
}

impl PublicHoliday {
    pub fn new<'a>(
        name: &'a str,
        year: Option<&'a i32>,
        yearless_date: Option<&'a str>,
        easter_sunday_offset: Option<&'a i32>,
    ) -> NewPublicHoliday<'a> {
        NewPublicHoliday {
            name,
            year,
            yearless_date,
            easter_sunday_offset,
        }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "public_holidays"]
pub struct NewPublicHoliday<'a> {
    pub name: &'a str,
    pub year: Option<&'a i32>,
    pub yearless_date: Option<&'a str>,
    pub easter_sunday_offset: Option<&'a i32>,
}

impl Display for NewPublicHoliday<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewPublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<NewPublicHoliday {}",
                    " (Yearless date: {:?}",
                    " | Easter sunday offset: {:?}",
                    " | Year: {:?})>"
                ),
                self.name, self.yearless_date, self.easter_sunday_offset, self.year
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
