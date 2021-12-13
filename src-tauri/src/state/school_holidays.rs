use std::collections::HashMap;

use super::types::DateData;

pub type SchoolHolidays = HashMap<i32, SchoolHoliday>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SchoolHoliday {
    pub name: String,
    pub start: DateData,
    pub end: DateData,
}
