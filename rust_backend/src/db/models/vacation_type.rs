use super::super::schema::vacation_types;

#[derive(Queryable)]
pub struct VacationType {
    pub id: i32,
    pub name: String,
    pub count: bool,
}
#[derive(Insertable)]
#[table_name = "vacation_types"]
pub struct NewVacationType<'a> {
    pub name: &'a str,
    pub count: &'a bool,
}

impl VacationType {
    pub fn new<'a>(name: &'a str, count: &'a bool) -> NewVacationType<'a> {
        NewVacationType { name, count }
    }
}
