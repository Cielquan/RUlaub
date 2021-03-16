use super::super::schema::school_holiday_types;

#[derive(Queryable)]
pub struct SchoolHolidayType {
    pub id: i32,
    pub name: String,
}
#[derive(Insertable)]
#[table_name = "school_holiday_types"]
pub struct NewSchoolHolidayType<'a> {
    pub name: &'a str,
}

impl SchoolHolidayType {
    pub fn new(name: &str) -> NewSchoolHolidayType {
        NewSchoolHolidayType { name }
    }
}
