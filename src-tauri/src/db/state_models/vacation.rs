use std::collections::HashMap;

use super::types::DateData;
use super::user::UserId;

pub type Vacations = HashMap<UserId, HashMap<VacationId, Vacation>>;
pub type VacationId = i32;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Vacation {
    pub type_id: i32,
    pub start: DateData,
    pub end: DateData,
}
