use super::super::schema::users;

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
    pub name: &'a str,
    pub vacation_days: &'a i32,
    pub hex_color: &'a i32,
    pub group_manager_id: Option<&'a i32>,
}

impl User {
    pub fn new<'a>(
        name: &'a str,
        vacation_days: &'a i32,
        hex_color: &'a i32,
        group_manager_id: Option<&'a i32>,
    ) -> NewUser<'a> {
        NewUser {
            name,
            vacation_days,
            hex_color,
            group_manager_id,
        }
    }
}
