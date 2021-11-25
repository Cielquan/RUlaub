use std::{collections::HashMap, io::Error as IOError};

use thiserror::Error;

use super::CONFIG;
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