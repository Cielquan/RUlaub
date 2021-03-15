use chrono::NaiveDate;

use super::super::schema::school_holidays;

#[derive(Queryable)]
pub struct SchoolHoliday {
    pub id: i32,
    pub state_id: i32,
    pub type_id: i32,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub comment: Option<String>,
}
#[derive(Insertable)]
#[table_name = "school_holidays"]
pub struct NewSchoolHoliday<'a> {
    pub state_id: &'a i32,
    pub type_id: &'a i32,
    pub start_date: &'a NaiveDate,
    pub end_date: &'a NaiveDate,
    pub comment: Option<&'a str>,
}

impl SchoolHoliday {
    pub fn new<'a>(
        state_id: &'a i32,
        type_id: &'a i32,
        start_date: &'a NaiveDate,
        end_date: &'a NaiveDate,
        comment: Option<&'a str>,
    ) -> NewSchoolHoliday<'a> {
        NewSchoolHoliday {
            state_id,
            type_id,
            start_date,
            end_date,
            comment,
        }
    }
}
