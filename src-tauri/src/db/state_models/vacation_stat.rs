use std::collections::HashMap;

pub type VacationStatsMap = HashMap<super::user::UserId, Stats>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stats {
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Calc {
    pub taken_vacation_days: u32,
    pub vacation_stats: VacationStats,
}

pub type VacationStats = HashMap<super::vacation_type::VacationTypeId, u32>;
