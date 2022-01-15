use std::collections::HashMap;

use super::user::UserId;
use super::vacation_type::VacationTypeId;

pub type VacationStatsMap = HashMap<UserId, Stats>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stats {
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Calc {
    pub taken_vacation_days: u32,
    pub vacation_stats: VacationStats,
}

pub type VacationStats = HashMap<VacationTypeId, u32>;
