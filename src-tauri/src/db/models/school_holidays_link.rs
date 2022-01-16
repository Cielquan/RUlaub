use std::fmt::{self, Display, Formatter};

use crate::db::schema::school_holidays_link;

use super::entry_traits::NewDBEntry;

/// The database model for school holidays link.
#[derive(Queryable, Debug)]
pub struct SchoolHolidayLink {
    pub link: String,
}

impl Display for SchoolHolidayLink {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "<SchoolHolidayLink {}>", self.link)
    }
}

impl SchoolHolidayLink {
    #[allow(clippy::new_ret_no_self)]
    #[allow(dead_code)] // TODO:#i# remove after usage
    pub fn new<'a>(link: &'a str) -> NewSchoolHolidayLink<'a> {
        NewSchoolHolidayLink { link }
    }
}

#[derive(Insertable, Debug, Clone)]
#[table_name = "school_holidays_link"]
pub struct NewSchoolHolidayLink<'a> {
    pub link: &'a str,
}

impl Display for NewSchoolHolidayLink<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "<SchoolHolidayLink {}>", self.link)
    }
}

type Table = school_holidays_link::table;
impl NewDBEntry<Table> for NewSchoolHolidayLink<'_> {
    const TABLE: Table = school_holidays_link::table;
}
