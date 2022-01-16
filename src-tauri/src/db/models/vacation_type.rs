use std::fmt::{self, Display, Formatter};

use crate::db::schema::vacation_types;

/// The database model for vacation types.
#[derive(Queryable, AsChangeset, Debug, Clone)]
#[table_name = "vacation_types"]
pub struct VacationType {
    pub id: i32,
    pub name: String,
    pub charge: bool,
    pub color_dark: String,
    pub color_light: String,
    pub active: bool,
}

impl Display for VacationType {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<VacationType {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<VacationType {}",
                    " (Charge: {}",
                    " | Color dark: {}",
                    " | Color light: {}",
                    " | ID: {})>"
                ),
                self.name, self.charge, self.color_dark, self.color_light, self.id
            )
        }
    }
}

impl VacationType {
    pub fn create_new_entry<'a>(
        name: &'a str,
        charge: &'a bool,
        color_dark: &'a str,
        color_light: &'a str,
        active: &'a bool,
    ) -> NewVacationType<'a> {
        NewVacationType {
            name,
            charge,
            color_dark,
            color_light,
            active,
        }
    }

    pub fn create_update_entry(
        id: i32,
        name: String,
        charge: bool,
        color_dark: String,
        color_light: String,
        active: bool,
    ) -> VacationType {
        VacationType {
            id,
            name,
            charge,
            color_dark,
            color_light,
            active,
        }
    }
}

#[derive(Insertable, Debug, Clone)]
#[table_name = "vacation_types"]
pub struct NewVacationType<'a> {
    pub name: &'a str,
    pub charge: &'a bool,
    pub color_dark: &'a str,
    pub color_light: &'a str,
    pub active: &'a bool,
}

impl Display for NewVacationType<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewVacationType {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<NewVacationType {}",
                    " (Charge: {}",
                    " | Color dark: {}",
                    " | Color light: {})>"
                ),
                self.name, self.charge, self.color_dark, self.color_light
            )
        }
    }
}
