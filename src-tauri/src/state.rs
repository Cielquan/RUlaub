use parking_lot::Mutex;

use crate::config::setup::ConfigSetupErr;
use crate::config::Config;

#[derive(PartialEq)]
pub enum ConfigFileLoaded {
    TRUE,
    FALSE,
}

#[derive(PartialEq)]
pub enum PageInit {
    LOADING,
    DONE,
}

pub struct ConfigSetupErrState(pub Mutex<ConfigSetupErr>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
