use parking_lot::Mutex;

use crate::config::setup::ConfigSetupErr;
use crate::config::Config;
use crate::db::setup::DBSetupErr;
use crate::logging::tracer::TracerHandle;

#[derive(Debug, PartialEq)]
pub enum PageInit {
    LOADING,
    DONE,
    ABORTED,
}

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct DBSetupErrState(pub Mutex<Option<DBSetupErr>>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct TracerHandleState(pub Mutex<TracerHandle>);
