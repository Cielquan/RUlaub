use parking_lot::Mutex;

use crate::config::setup::ConfigSetupErr;
use crate::config::Config;
use crate::logging::tracer::TracerHandle;

#[derive(Debug, PartialEq, Serialize)]
pub enum DBSetup {
    Loading,
    OK,
    NoUriSet,
    NoFileFound,
    DBError,
}

#[derive(Debug, PartialEq)]
pub enum PageInit {
    LOADING,
    DONE,
    ABORTED,
}

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct DBSetupState(pub Mutex<DBSetup>);
pub struct PageInitState(pub Mutex<PageInit>);
pub struct TracerHandleState(pub Mutex<TracerHandle>);
