use std::fmt;

use crate::db::schema::users;

/// The database model for users.
#[derive(Queryable, AsChangeset, Debug, Clone)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub name: String,
    pub vacation_days: i32,
    pub monday: bool,
    pub tuesday: bool,
    pub wednesday: bool,
    pub thursday: bool,
    pub friday: bool,
    pub saturday: bool,
    pub sunday: bool,
}

impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<User {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<User {}",
                    " (Vacation days: {}",
                    " | Monday: {}",
                    " | Tuesday: {}",
                    " | Wednesday: {}",
                    " | Thursday: {}",
                    " | Friday: {}",
                    " | Saturday: {}",
                    " | Sunday: {}",
                    " | ID: {})>"
                ),
                self.name,
                self.vacation_days,
                self.monday,
                self.tuesday,
                self.wednesday,
                self.thursday,
                self.friday,
                self.saturday,
                self.sunday,
                self.id
            )
        }
    }
}

impl User {
    pub fn create_new_entry<'a>(
        name: &'a str,
        vacation_days: &'a i32,
        monday: &'a bool,
        tuesday: &'a bool,
        wednesday: &'a bool,
        thursday: &'a bool,
        friday: &'a bool,
        saturday: &'a bool,
        sunday: &'a bool,
    ) -> NewUser<'a> {
        trace!("Create NewUser instance");
        NewUser {
            name,
            vacation_days,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        }
    }

    pub fn create_update_entry(
        id: i32,
        name: String,
        vacation_days: i32,
        monday: bool,
        tuesday: bool,
        wednesday: bool,
        thursday: bool,
        friday: bool,
        saturday: bool,
        sunday: bool,
    ) -> User {
        User {
            id,
            name,
            vacation_days,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        }
    }
}

#[derive(Insertable, Debug, Clone)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub name: &'a str,
    pub vacation_days: &'a i32,
    pub monday: &'a bool,
    pub tuesday: &'a bool,
    pub wednesday: &'a bool,
    pub thursday: &'a bool,
    pub friday: &'a bool,
    pub saturday: &'a bool,
    pub sunday: &'a bool,
}

impl fmt::Display for NewUser<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewUser {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<NewUser {}",
                    " (Vacation days: {}",
                    " | Monday: {}",
                    " | Tuesday: {}",
                    " | Wednesday: {}",
                    " | Thursday: {}",
                    " | Friday: {}",
                    " | Saturday: {}",
                    " | Sunday: {})>"
                ),
                self.name,
                self.vacation_days,
                self.monday,
                self.tuesday,
                self.wednesday,
                self.thursday,
                self.friday,
                self.saturday,
                self.sunday,
            )
        }
    }
}
