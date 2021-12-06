use std::collections::HashMap;

use super::util::DateData;

pub type Users = HashMap<i32, User>;

pub struct User {
    pub name: String,
    pub workdays: Workdays,
    pub available_vacation_days: i32,
    pub vacations: Vacations,
    pub calc: Calc,
}

pub struct Workdays {
    pub monday: bool,
    pub tuesday: bool,
    pub wednesday: bool,
    pub thursday: bool,
    pub friday: bool,
    pub saturday: bool,
    pub sunday: bool,
}

pub type Vacations = HashMap<i32, Vacation>;

pub struct Vacation {
    pub type_id: i32,
    pub start: DateData,
    pub end: DateData,
}

pub struct Calc {
    pub taken_vacation_days: i32,
    pub vacation_stats: Vec<VacationStat>,
}

pub struct VacationStat {
    pub type_id: i32,
    pub count: i32,
}
