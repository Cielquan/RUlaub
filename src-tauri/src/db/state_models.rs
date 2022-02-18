//! Database models used by the application.
pub mod public_holiday;
pub mod school_holiday;
pub mod types;
pub mod user;
pub mod vacation;
pub mod vacation_stat;
pub mod vacation_type;

pub use public_holiday::{PublicHoliday, PublicHolidayVariant, PublicHolidays};
pub use school_holiday::{SchoolHoliday, SchoolHolidays};
pub use user::{User, Users};
pub use vacation::{UpdatedVacations, Vacation, Vacations};
pub use vacation_stat::{VacationStats, VacationStatsMap};
pub use vacation_type::{VacationType, VacationTypes};
