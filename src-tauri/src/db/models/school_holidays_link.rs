use std::fmt;

use crate::db::schema::school_holidays_link;

/// The database model for school holidays link.
#[derive(Queryable, AsChangeset, Debug, Clone)]
#[table_name = "school_holidays_link"]
pub struct SchoolHolidayLink {
    pub link: String,
}

impl fmt::Display for SchoolHolidayLink {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "<SchoolHolidayLink {}>", self.link)
    }
}

impl SchoolHolidayLink {
    pub fn create_new_entry(link: &'_ str) -> NewSchoolHolidayLink<'_> {
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

impl fmt::Display for NewSchoolHolidayLink<'_> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "<SchoolHolidayLink {}>", self.link)
    }
}
