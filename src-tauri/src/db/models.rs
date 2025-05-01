//! Database models used by the application.
mod public_holiday;
mod school_holiday;
mod school_holidays_link;
mod user;
mod vacation;
mod vacation_type;

pub use public_holiday::{NewPublicHoliday, PublicHoliday};
pub use school_holiday::{NewSchoolHoliday, SchoolHoliday};
pub use school_holidays_link::{NewSchoolHolidayLink, SchoolHolidayLink};
pub use user::{NewUser, User};
pub use vacation::{NewVacation, UpdatedVacation, Vacation};
pub use vacation_type::{NewVacationType, VacationType};
