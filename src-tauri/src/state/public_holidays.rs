use std::collections::HashMap;

pub type PublicHolidays = HashMap<i32, PublicHolidayVariant>;

pub enum PublicHolidayVariant {
    DateBasedHoliday(DateBasedHoliday),
    EasterBasedHoliday(EasterBasedHoliday),
}

pub struct DateBasedHoliday {
    pub name: String,
    pub yearless_date: YearlessISODate,
    pub year: Option<i32>,
    pub calc: Calc,
}

pub struct EasterBasedHoliday {
    pub name: String,
    pub easter_sunday_offset: i32,
    pub year: Option<i32>,
    pub calc: Calc,
}

pub struct Calc {
    pub year_day: i32,
}

pub type YearlessISODate = String;
