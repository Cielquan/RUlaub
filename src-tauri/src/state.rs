mod public_holidays;
mod school_holidays;
pub mod status_states;
mod user_row_map;
mod vacation_types;

use parking_lot::Mutex;

use self::public_holidays::PublicHolidays;
use self::school_holidays::SchoolHolidays;
use self::status_states::PageInit;
use self::user_row_map::UserRowMap;
use self::vacation_types::VacationTypes;
use crate::config::setup::ConfigSetupErr;
use crate::config::Config;

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct PublicHolidaysState(pub Mutex<PublicHolidays>);
pub struct SchoolHolidaysState(pub Mutex<SchoolHolidays>);
pub struct UserRowMapState(pub Mutex<UserRowMap>);
pub struct VacationTypesState(pub Mutex<VacationTypes>);
