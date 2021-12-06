use std::collections::HashMap;

pub type PublicHolidays = HashMap<i32, PublicHoliday>;

pub struct PublicHoliday {
    pub name: String,
    pub year: Option<i32>,
    pub yearless_date: Option<String>,
    pub easter_sunday_offset: Option<i32>,
}
