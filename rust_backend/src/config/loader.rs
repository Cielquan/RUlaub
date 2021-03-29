use std::collections::HashMap;
use std::io::{Error as IOError, ErrorKind as IOErrorKind};
use std::path::{Path, PathBuf};
use std::sync::mpsc::channel;
use std::sync::RwLock;
use std::time::Duration;

use configlib::*;
use directories::ProjectDirs;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};
use tracing::{debug, error, info, trace};

/*
1. Build path
2. Check path
3. Check if file
4. Get as String

*/

use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("Could not build config file path.")]
    PathNotFound,
    #[error("Could not stringify config file path.")]
    PathStringify,
}

fn build_conf_file_path() -> Option<PathBuf> {
    Some(
        ProjectDirs::from("", crate::AUTHOR, crate::NAME)?
            .config_dir()
            .join("settings.toml"),
    )
}

fn get_conf_file_path() -> Result<PathBuf, ConfigError> {
    match build_conf_file_path() {
        Some(path) => {
            trace!("Built conf file path: <{:?}>", path);
            Ok(path)
        }
        None => {
            error!(concat!(
                "Failed to build conf file path. ",
                "Potential issue with the filesystem. ",
                "Could not find project direcotries for this OS."
            ));
            Err(ConfigError::PathNotFound)
        }
    }
}

fn check_conf_file_path_is_file() -> bool {
    match get_conf_file_path() {
        Some(path) => {
            debug!("Config file <{:?}> does exist.", path);
            return Path::new(&path).is_file();
        }
        None => false,
    }
}

fn get_conf_file_path_as_string() -> Result<String, ConfigError> {
    if let Some(path) = get_conf_file_path()?.to_str() {
        return Ok(String::from(path));
    }
    Err(ConfigError::PathStringify)
}

fn check_conf_file_path() -> PathBuf {
    get_conf_file_path().expect({
        let err = concat!(
            "Potential issue with the filesystem. ",
            "Could not find project direcotries for this OS."
        );
        error!(err);
        err
    })
}

lazy_static! {
    #[derive(Debug)]
    pub static ref SETTINGS_FILE_PATH: PathBuf = {
        check_conf_file_path()
    };
    pub static ref SETTINGS_FILE_PATH_STR: String = {
        if let Some(path) = SETTINGS_FILE_PATH.to_str() {
            return String::from(path)
        }
        String::new()
    };
    pub static ref SETTINGS_FILE_FOUND: bool = {
        if let Ok(path) = get_conf_file_path() {
            return Path::new(&path).is_file()
        }
        false
    };
    pub static ref SETTINGS: RwLock<Config> = RwLock::new({
        let mut settings = Config::default();
        settings.merge(File::with_name(&SETTINGS_FILE_PATH_STR[..])).expect({
            let err = "Failed to merge config file into config struct.";
            error!(err);
            err
        });
        settings
    });
}

fn log_settings() {
    debug!(
        "Loaded Settings:\n{:?}",
        SETTINGS
            .read()
            .unwrap()
            .clone()
            .try_into::<HashMap<String, String>>()
            .unwrap()
    );
}

fn watch_file() {
    let (tx, rx) = channel();

    let mut watcher: RecommendedWatcher =
        Watcher::new(tx, Duration::from_secs(2)).unwrap();

    watcher
        .watch(&SETTINGS_FILE_PATH_STR[..], RecursiveMode::NonRecursive)
        .unwrap();

    loop {
        match rx.recv() {
            Ok(DebouncedEvent::Write(_)) => {
                info!("Settings.toml updated. Refreshing configuration.");
                SETTINGS.write().unwrap().refresh().unwrap();
                log_settings();
            }
            Err(e) => error!("Error while watching settings file: {:?}", e),
            _ => { /* Ignore other event */ }
        }
    }
}

pub fn watch_settings_file() {
    log_settings();
    watch_file();
}
