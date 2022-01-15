use chrono::NaiveDate;

/// A partial database model for vacations joined with vacation_types.
#[derive(Queryable, Debug)]
pub struct VacationWithType {
    pub user_id: i32,
    pub vacation_type_id: i32,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub charge: bool,
}
