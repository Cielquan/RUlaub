pub mod public_holidays;
pub mod school_holidays;
pub mod status_states;
mod types;
pub mod user_row_map;
pub mod users;
pub mod vacation_types;

use parking_lot::Mutex;

use self::public_holidays::PublicHolidays;
use self::school_holidays::SchoolHolidays;
use self::status_states::PageInit;
use self::user_row_map::UserRowMap;
use self::users::Users;
use self::vacation_types::VacationTypes;
use crate::config::setup::ConfigSetupErr;
use crate::config::Config;

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct PublicHolidaysState(pub Mutex<PublicHolidays>);
pub struct SchoolHolidaysState(pub Mutex<SchoolHolidays>);
pub struct UserRowMapState(pub Mutex<UserRowMap>);
pub struct UsersState(pub Mutex<Users>);
pub struct VacationTypesState(pub Mutex<VacationTypes>);
