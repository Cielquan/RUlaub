use std::fmt::{self, Display, Formatter};

use diesel::prelude::*;
use diesel::result::Error;
use tracing::{instrument, debug, trace};

use super::super::schema::users;

#[derive(Queryable, Debug)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub vacation_days: i32,
    pub hex_color: i32,
    pub group_manager_id: Option<i32>,
}
#[derive(Insertable, Debug)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub name: &'a str,
    pub vacation_days: &'a i32,
    pub hex_color: &'a i32,
    pub group_manager_id: Option<&'a i32>,
}

impl User {
    #[instrument]
    pub fn new<'a>(
        name: &'a str,
        vacation_days: &'a i32,
        hex_color: &'a i32,
        group_manager_id: Option<&'a i32>,
    ) -> NewUser<'a> {
        trace!("Create NewUser instance");
        NewUser {
            name,
            vacation_days,
            hex_color,
            group_manager_id,
        }
    }
}

impl Display for User {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<User {}>", self.name)
        } else {
            write!(
                f,
                "<User {} (ID: {} | color: {:x} | Vacation days: {} | Boss: {:?})>",
                self.name,
                self.id,
                self.hex_color,
                self.vacation_days,
                self.group_manager_id
            )
        }
    }
}

impl NewUser<'_> {
    #[instrument(skip(self, conn))]
    pub fn save_to_db(self, conn: &SqliteConnection) -> Result<i32, Error> {
        debug!(target: "new_db_entry", "Adding to db: {:?}", &self);
        diesel::insert_into(users::table)
            .values(&self)
            .execute(conn)?;
        trace!(target: "new_db_entry", "Get `last_insert_rowid` for id of: {:#}", &self);
        let id = diesel::select(super::super::last_insert_rowid).get_result::<i32>(conn);
        debug!(target: "new_db_entry", "Got ID: <{:?}> for {:#}", id, &self);
        id
    }
}

impl Display for NewUser<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewUser {}>", self.name)
        } else {
            write!(
                f,
                "<NewUser {} (ID: None | color: {:x} | Vacation days: {} | Boss: {:?})>",
                self.name, self.hex_color, self.vacation_days, self.group_manager_id
            )
        }
    }
}
