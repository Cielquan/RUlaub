use std::collections::HashMap;

pub type PublicHolidayId = i32;
pub type PublicHolidays = HashMap<PublicHolidayId, PublicHolidayVariant>;

pub type PublicHoliday = PublicHolidayVariant;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PublicHolidayVariant {
    DateBasedHoliday(DateBasedHoliday),
    EasterBasedHoliday(EasterBasedHoliday),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DateBasedHoliday {
    pub name: String,
    pub yearless_date: YearlessISODate,
    pub year: Option<i32>,
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EasterBasedHoliday {
    pub name: String,
    pub easter_sunday_offset: i32,
    pub year: Option<i32>,
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Calc {
    pub year_day: i32,
}

pub type YearlessISODate = String;
