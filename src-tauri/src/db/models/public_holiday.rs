use std::fmt::{self, Display, Formatter};

use crate::db::schema::public_holidays;

use super::entry_traits::NewDBEntry;

/// The database model for public holidays.
#[derive(Queryable, Debug)]
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
    #[allow(clippy::new_ret_no_self)]
    #[allow(dead_code)] // TODO:#i# remove after usage
    pub fn new<'a>(
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

type Table = public_holidays::table;
impl NewDBEntry<Table> for NewPublicHoliday<'_> {
    const TABLE: Table = public_holidays::table;
}
