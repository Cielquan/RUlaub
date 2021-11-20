use std::fmt::{self, Display, Formatter};

use anyhow::Result;
use diesel::prelude::*;
use tracing::{debug, instrument, trace};

use crate::db::{schema::vacation_types, util::last_insert_rowid};

#[derive(Queryable, Debug)]
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
    #[allow(clippy::new_ret_no_self)]
    pub fn new<'a>(
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
}

#[derive(Insertable, Debug)]
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

impl NewVacationType<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(vacation_types::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn)?;
        debug!(target: "new_db_entry", "Got ID: <{}> for {:#}", id, &self);
        Ok(id)
    }
}