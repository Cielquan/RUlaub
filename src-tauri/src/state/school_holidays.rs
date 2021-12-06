use std::collections::HashMap;

use super::util::DateData;

pub type SchoolHolidays = HashMap<i32, SchoolHoliday>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SchoolHoliday {
    pub name: String,
    pub start: DateData,
    pub end: DateData,
}
