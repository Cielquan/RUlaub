use std::collections::HashMap;

use chrono::NaiveDate;

pub type SchoolHolidays = HashMap<i32, SchoolHoliday>;

pub struct SchoolHoliday {
    pub name: String,
    pub start_date: NaiveDate,
    pub start_year_day: i32,
    pub start_year: i32,
    pub end_date: NaiveDate,
    pub end_year_day: i32,
    pub end_year: i32,
}
