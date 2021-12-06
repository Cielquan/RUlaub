use std::collections::HashMap;

pub type PublicHolidays = HashMap<i32, PublicHolidayVariant>;

#[derive(Debug, Clone, Serialize)]
pub enum PublicHolidayVariant {
    DateBasedHoliday(DateBasedHoliday),
    EasterBasedHoliday(EasterBasedHoliday),
}

#[derive(Debug, Clone, Serialize)]
pub struct DateBasedHoliday {
    pub name: String,
    pub yearless_date: YearlessISODate,
    pub year: Option<i32>,
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize)]
pub struct EasterBasedHoliday {
    pub name: String,
    pub easter_sunday_offset: i32,
    pub year: Option<i32>,
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize)]
pub struct Calc {
    pub year_day: i32,
}

pub type YearlessISODate = String;
