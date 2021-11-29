use std::{collections::HashMap, io::Error as IOError};

use thiserror::Error;

use super::{CONFIG, DEFAULT_CONFIG_TOML_STR};
use crate::NL;

#[tracing::instrument]
pub fn log_config() {
    trace!("Log current config.");
    let config_guard = CONFIG.read();
    if let Ok(config) = config_guard
        .clone()
        .try_into::<HashMap<String, HashMap<String, String>>>()
    {
        debug!("Loaded config:{}{:?}", NL, config);
        return;
    }

    error!(
        concat!(
            "Failed to load config into representable data type. ",
            "Most propably because of invalid config data:{}{:?}"
        ),
        NL, config_guard
    );
}

pub fn create_default_config() -> configlib::Config {
    trace!("Create default config.");
    let conf_vars = DEFAULT_CONFIG_TOML_STR
        .split('\n')
        .filter(|s| s != &"")
        .map(|s| s.split(" = ").collect::<Vec<&str>>());
    let mut config = configlib::Config::default();
    for c in conf_vars {
        config.set(c[0], c[1]).unwrap();
    }
    config
}

#[derive(Error, Debug)]
pub enum ConfigFileError {
    #[error("Could not find project dirs.")]
    ProjectDirsNotFound,
    #[error("Could not stringify config file path.")]
    PathStringify,
    #[error("Could not interact with config file.")]
    FileError(#[from] IOError),
}

#[derive(Error, Debug)]
pub enum FileWatchError {
    #[error("Could not stringify config file path.")]
    WatcherInitError(#[from] notify::Error),
    #[error("Config RwLock returned an error.")]
    WatcherRwLockError,
    #[error("Updating the Config returned an error.")]
    ConfigUpdateError,
}
