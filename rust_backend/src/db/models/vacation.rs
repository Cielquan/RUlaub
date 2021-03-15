use chrono::NaiveDate;

use super::super::schema::vacations;

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

impl Vacation {
    pub fn new<'a>(
        user_id: &'a i32,
        start_date: &'a NaiveDate,
        end_date: &'a NaiveDate,
        type_id: &'a i32,
        setup_id: &'a i32,
    ) -> NewVacation<'a> {
        NewVacation {
            user_id,
            start_date,
            end_date,
            type_id,
            setup_id,
        }
    }
}
