use std::fmt::{self, Display, Formatter};

use diesel::prelude::*;
use diesel::result::Error;
use tracing::{debug, instrument, trace};

use super::super::{schema::vacation_types, util::last_insert_rowid};

#[derive(Queryable, Debug)]
pub struct VacationType {
    pub id: i32,
    pub name: String,
    pub count: bool,
}

impl Display for VacationType {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<VacationType {}>", self.name)
        } else {
            write!(
                f,
                "<VacationType {} (Do count: {} | ID: {})>",
                self.name, self.count, self.id
            )
        }
    }
}

impl VacationType {
    pub fn new<'a>(name: &'a str, count: &'a bool) -> NewVacationType<'a> {
        NewVacationType { name, count }
    }
}

#[derive(Insertable, Debug)]
#[table_name = "vacation_types"]
pub struct NewVacationType<'a> {
    pub name: &'a str,
    pub count: &'a bool,
}

impl Display for NewVacationType<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewVacationType {}>", self.name)
        } else {
            write!(
                f,
                "<NewVacationType {} (Do count: {})>",
                self.name, self.count
            )
        }
    }
}

impl NewVacationType<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32, Error> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(vacation_types::table)
            .values(&self)
            .execute(conn)?;

        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(last_insert_rowid).get_result::<i32>(conn);
        debug!(target: "new_db_entry", "Got ID: <{:?}> for {:#}", id, &self);
        id
    }
}
