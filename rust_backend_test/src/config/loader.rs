use std::{
    collections::HashMap,
    path::Path,
    sync::{mpsc::channel, RwLock},
    time::Duration,
};

use configlib::*;
use directories::ProjectDirs;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};
use thiserror::Error;
use tracing::{debug, error, info, trace};

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("Could not find project dirs.")]
    ProjectDirsNotFound,
    #[error("Could not stringify config file path.")]
    PathStringify,
}

#[tracing::instrument]
fn get_conf_file_path() -> Result<String, ConfigError> {
    match ProjectDirs::from("", crate::AUTHOR, crate::NAME) {
        None => {
            error!("Could not find project directories for this OS.");
            Err(ConfigError::ProjectDirsNotFound)
        }
        Some(project_dirs) => {
            match project_dirs.config_dir().join("settings.toml").to_str() {
                None => {
                    error!(concat!(
                        "Failed to build conf file path. ",
                        "Could not stringify the path."
                    ));
                    Err(ConfigError::PathStringify)
                }
                Some(path) => {
                    trace!("Built conf file path: <{}>", path);
                    Ok(String::from(path))
                }
            }
        }
    }
}

fn check_path_is_file(path: &str) -> bool {
    trace!("Check if path <{:?}> points to file.", path);
    let is_file = Path::new(path).is_file();
    debug!("Path <{:?}> points to file: {}", path, is_file);
    is_file
}

lazy_static! {
    #[derive(Debug)]
    pub static ref SETTINGS_FILE_PATH_STR: String = get_conf_file_path().unwrap_or_default();
    pub static ref SETTINGS_FILE_FOUND: bool = check_path_is_file(&SETTINGS_FILE_PATH_STR);
    pub static ref SETTINGS: RwLock<Config> = RwLock::new({
        let mut settings = Config::default();
        settings.merge(File::with_name(&SETTINGS_FILE_PATH_STR)).expect({
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
