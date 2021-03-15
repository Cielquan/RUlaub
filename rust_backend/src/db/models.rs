use chrono::NaiveDate;

use super::schema::{
    public_holidays, school_holiday_types, school_holidays, setups, states, users,
    vacation_types, vacations,
};

#[derive(Queryable)]
pub struct PublicHoliday {
    pub id: i32,
    pub state_id: i32,
    pub name: String,
    pub date: NaiveDate,
}
#[derive(Insertable)]
#[table_name = "public_holidays"]
pub struct NewPublicHoliday<'a> {
    pub state_id: &'a i32,
    pub name: &'a String,
    pub date: &'a NaiveDate,
}

#[derive(Queryable)]
pub struct SchoolHolidayType {
    pub id: i32,
    pub name: String,
}
#[derive(Insertable)]
#[table_name = "school_holiday_types"]
pub struct NewSchoolHolidayType<'a> {
    pub name: &'a String,
}

#[derive(Queryable)]
pub struct SchoolHoliday {
    pub id: i32,
    pub state_id: i32,
    pub type_id: i32,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub comment: String,
}
#[derive(Insertable)]
#[table_name = "school_holidays"]
pub struct NewSchoolHoliday<'a> {
    pub state_id: &'a i32,
    pub type_id: &'a i32,
    pub start_date: &'a NaiveDate,
    pub end_date: &'a NaiveDate,
    pub comment: Option<&'a String>,
}

#[derive(Queryable)]
pub struct Setup {
    pub id: i32,
    pub year: i32,
    pub state_id: i32,
}
#[derive(Insertable)]
#[table_name = "setups"]
pub struct NewSetup<'a> {
    pub year: &'a i32,
    pub state_id: &'a i32,
}

#[derive(Queryable)]
pub struct State {
    pub id: i32,
    pub state_abbr: String,
    pub state_full: String,
}
#[derive(Insertable)]
#[table_name = "states"]
pub struct NewState<'a> {
    pub state_abbr: &'a String,
    pub state_full: &'a String,
}

#[derive(Queryable, Debug)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub vacation_days: i32,
    pub hex_color: i32,
    pub group_manager_id: Option<i32>,
}
#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub name: &'a String,
    pub vacation_days: &'a i32,
    pub hex_color: &'a i32,
    pub group_manager_id: Option<&'a i32>,
}

#[derive(Queryable)]
pub struct VacationType {
    pub id: i32,
    pub name: String,
    pub count: bool,
}
#[derive(Insertable)]
#[table_name = "vacation_types"]
pub struct NewVacationType<'a> {
    pub name: &'a String,
    pub count: &'a bool,
}

#[derive(Queryable)]
pub struct Vacation {
    pub id: i32,
    pub user_id: i32,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub type_id: i32,
    pub setup_id: i32,
}
#[derive(Insertable)]
#[table_name = "vacations"]
pub struct NewVacation<'a> {
    pub user_id: &'a i32,
    pub start_date: &'a NaiveDate,
    pub end_date: &'a NaiveDate,
    pub type_id: &'a i32,
    pub setup_id: &'a i32,
}
