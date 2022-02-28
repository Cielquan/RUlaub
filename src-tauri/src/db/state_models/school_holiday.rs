use std::collections::HashMap;

pub type SchoolHolidayId = i32;
pub type SchoolHolidays = HashMap<SchoolHolidayId, SchoolHoliday>;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SchoolHoliday {
    pub name: String,
    pub start: super::types::DateData,
    pub end: super::types::DateData,
}
