use super::super::schema::setups;

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

impl Setup {
    pub fn new<'a>(year: &'a i32, state_id: &'a i32) -> NewSetup<'a> {
        NewSetup { year, state_id }
    }
}
