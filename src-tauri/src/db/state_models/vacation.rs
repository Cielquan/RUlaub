use std::collections::HashMap;

pub type VacationId = i32;
pub type Vacations = HashMap<super::user::UserId, HashMap<VacationId, Vacation>>;
pub type UpdatedVacations = HashMap<VacationId, Vacation>;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Vacation {
    pub type_id: i32,
    pub start: super::types::DateData,
    pub end: super::types::DateData,
}
