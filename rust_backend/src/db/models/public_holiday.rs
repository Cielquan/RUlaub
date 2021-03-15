use chrono::NaiveDate;

use super::super::schema::public_holidays;

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
    pub name: &'a str,
    pub date: &'a NaiveDate,
}

impl PublicHoliday {
    pub fn new<'a>(
        state_id: &'a i32,
        name: &'a str,
        date: &'a NaiveDate,
    ) -> NewPublicHoliday<'a> {
        NewPublicHoliday {
            state_id,
            name,
            date,
        }
    }
}
