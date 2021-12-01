use parking_lot::Mutex;

use crate::config::Config;

pub enum ConfigFileLoaded {
    TRUE,
    FALSE,
}

pub struct ConfigFileLoadedState(pub Mutex<ConfigFileLoaded>);
pub struct ConfigState(pub Mutex<Config>);
