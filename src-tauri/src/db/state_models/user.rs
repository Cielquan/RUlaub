use std::collections::HashMap;

pub type Users = HashMap<UserId, User>;
pub type UserId = i32;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub name: String,
    pub workdays: Workdays,
    pub available_vacation_days: i32,
    pub calc: Calc,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Workdays {
    pub monday: bool,
    pub tuesday: bool,
    pub wednesday: bool,
    pub thursday: bool,
    pub friday: bool,
    pub saturday: bool,
    pub sunday: bool,
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
