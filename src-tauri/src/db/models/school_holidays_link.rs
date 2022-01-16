use std::fmt::{self, Display, Formatter};

use crate::db::schema::school_holidays_link;

/// The database model for school holidays link.
#[derive(Queryable, AsChangeset, Debug, Clone)]
#[table_name = "school_holidays_link"]
pub struct SchoolHolidayLink {
    pub link: String,
}

impl Display for SchoolHolidayLink {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "<SchoolHolidayLink {}>", self.link)
    }
}

impl SchoolHolidayLink {
    pub fn create_new_entry<'a>(link: &'a str) -> NewSchoolHolidayLink<'a> {
        NewSchoolHolidayLink { link }
    }

    pub fn create_update_entry(link: String) -> SchoolHolidayLink {
        SchoolHolidayLink { link }
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
