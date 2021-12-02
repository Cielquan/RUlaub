use parking_lot::Mutex;

use crate::config::Config;

pub enum ConfigFileLoaded {
    TRUE,
    FALSE,
}

pub enum PageInit {
    LOADING,
    DONE,
}

pub struct ConfigFileLoadedState(pub Mutex<ConfigFileLoaded>);
pub struct ConfigState(pub Mutex<Config>);
pub struct PageInitState(pub Mutex<PageInit>);
