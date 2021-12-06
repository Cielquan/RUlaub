pub mod status_states;

use parking_lot::Mutex;

use crate::config::setup::ConfigSetupErr;
use crate::config::Config;
use crate::db::models::{PublicHoliday, SchoolHoliday, VacationType};
use status_states::PageInit;

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct PublicHolidaysState(pub Mutex<Vec<PublicHoliday>>);
pub struct SchoolHolidaysState(pub Mutex<Vec<SchoolHoliday>>);
pub struct VacationTypesState(pub Mutex<Vec<VacationType>>);
