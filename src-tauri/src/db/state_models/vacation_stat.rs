use std::collections::HashMap;

use super::user::UserId;

pub type VacationStats = HashMap<UserId, Stats>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stats {
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Calc {
    pub taken_vacation_days: i32,
    pub vacation_stats: Vec<VacationStat>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VacationStat {
    pub type_id: i32,
    pub count: i32,
}
