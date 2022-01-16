use std::fmt::{self, Display, Formatter};

use crate::db::schema::public_holidays;

/// The database model for public holidays.
#[derive(Queryable, AsChangeset, Debug, Clone)]
#[table_name = "public_holidays"]
pub struct PublicHoliday {
    pub id: i32,
    pub name: String,
    pub year: Option<i32>,
    pub yearless_date: Option<String>,
    pub easter_sunday_offset: Option<i32>,
}

impl Display for PublicHoliday {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<PublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<PublicHoliday {}",
                    " (Yearless date: {:?}",
                    " | Easter sunday offset: {:?}",
                    " | Year: {:?}",
                    " | ID: {})>"
                ),
                self.name, self.yearless_date, self.easter_sunday_offset, self.year, self.id
            )
        }
    }
}

impl PublicHoliday {
    pub fn create_new_entry<'a>(
        name: &'a str,
        year: Option<&'a i32>,
        yearless_date: Option<&'a str>,
        easter_sunday_offset: Option<&'a i32>,
    ) -> NewPublicHoliday<'a> {
        NewPublicHoliday {
            name,
            year,
            yearless_date,
            easter_sunday_offset,
        }
    }

    pub fn create_update_entry(
        id: i32,
        name: String,
        year: Option<i32>,
        yearless_date: Option<String>,
        easter_sunday_offset: Option<i32>,
    ) -> PublicHoliday {
        PublicHoliday {
            id,
            name,
            year,
            yearless_date,
            easter_sunday_offset,
        }
    }
}

#[derive(Insertable, Debug, Clone)]
#[table_name = "public_holidays"]
pub struct NewPublicHoliday<'a> {
    pub name: &'a str,
    pub year: Option<&'a i32>,
    pub yearless_date: Option<&'a str>,
    pub easter_sunday_offset: Option<&'a i32>,
}

impl Display for NewPublicHoliday<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if f.alternate() {
            write!(f, "<NewPublicHoliday {}>", self.name)
        } else {
            write!(
                f,
                concat!(
                    "<NewPublicHoliday {}",
                    " (Yearless date: {:?}",
                    " | Easter sunday offset: {:?}",
                    " | Year: {:?})>"
                ),
                self.name, self.yearless_date, self.easter_sunday_offset, self.year
            )
        }
    }
}
