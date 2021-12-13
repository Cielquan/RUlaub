use std::fmt::{self, Display, Formatter};

use chrono::NaiveDate;

use super::entry_traits::NewDBEntry;
use crate::db::schema::vacations;

/// The database model for vacations.
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
                self.vacation_type_id, self.user_id, self.start_date, self.end_date, self.id
            )
        }
    }
}

impl Vacation {
    #[allow(clippy::new_ret_no_self, clippy::too_many_arguments)]
    #[allow(dead_code)] // TODO:#i# remove after usage
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

#[derive(Insertable, Debug, Clone)]
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

type Table = vacations::table;
impl NewDBEntry<Table> for NewVacation<'_> {
    const TABLE: Table = vacations::table;
}
