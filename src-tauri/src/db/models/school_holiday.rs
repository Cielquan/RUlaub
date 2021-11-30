use std::fmt::{self, Display, Formatter};

use chrono::NaiveDate;

use crate::db::{schema::school_holidays, util::NewDBEntry};

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

#[derive(Insertable, Debug, Clone)]
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

type Table = school_holidays::table;
impl NewDBEntry<Table> for NewSchoolHoliday<'_> {
    const TABLE: Table = school_holidays::table;
}
