use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use chrono::NaiveDate;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::{schema::vacations, util::last_insert_rowid};

#[derive(Queryable, Debug)]
pub struct Vacation {
    pub id: i32,
    pub user_id: i32,
    pub vacation_type_id: i32,
    pub start_date: NaiveDate,
    pub start_year_day: i32,
    pub start_year: i32,
    pub end_date: NaiveDate,
    pub end_year_day: i32,
    pub end_year: i32,
}

impl Display for Vacation {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(
                f,
                "<Vacation {} for {}>",
                self.vacation_type_id, self.user_id
            )
        } else {
            write!(
                f,
                "<Vacation {} for {} (Start Date: {} | End Date: {} | ID: {})>",
                self.vacation_type_id,
                self.user_id,
                self.start_date,
                self.end_date,
                self.id
            )
        }
    }
}

impl Vacation {
    pub fn new<'a>(
        user_id: &'a i32,
        vacation_type_id: &'a i32,
        start_date: &'a NaiveDate,
        start_year_day: &'a i32,
        start_year: &'a i32,
        end_date: &'a NaiveDate,
        end_year_day: &'a i32,
        end_year: &'a i32,
    ) -> NewVacation<'a> {
        NewVacation {
            user_id,
            vacation_type_id,
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
#[table_name = "vacations"]
pub struct NewVacation<'a> {
    pub user_id: &'a i32,
    pub vacation_type_id: &'a i32,
    pub start_date: &'a NaiveDate,
    pub start_year_day: &'a i32,
    pub start_year: &'a i32,
    pub end_date: &'a NaiveDate,
    pub end_year_day: &'a i32,
    pub end_year: &'a i32,
}

impl Display for NewVacation<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(
                f,
                "<NewVacation {} for {}>",
                self.vacation_type_id, self.user_id
            )
        } else {
            write!(
                f,
                "<NewVacation {} for {} (Start Date: {} | End Date: {}>",
                self.vacation_type_id, self.user_id, self.start_date, self.end_date,
            )
        }
    }
}

impl NewVacation<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(vacations::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}
