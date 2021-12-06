pub mod status_states;
mod user_row_map;

use parking_lot::Mutex;

use self::status_states::PageInit;
use self::user_row_map::UserRowMap;
use crate::config::setup::ConfigSetupErr;
use crate::config::Config;
use crate::db::models::{PublicHoliday, SchoolHoliday, VacationType};

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct PublicHolidaysState(pub Mutex<Vec<PublicHoliday>>);
pub struct SchoolHolidaysState(pub Mutex<Vec<SchoolHoliday>>);
pub struct UserRowMapState(pub Mutex<UserRowMap>);
pub struct VacationTypesState(pub Mutex<Vec<VacationType>>);
