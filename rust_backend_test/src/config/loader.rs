use std::{collections::HashMap, sync::mpsc::channel, time::Duration};

use configlib::File as ConfigFile;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};
use parking_lot::RwLock;
use thiserror::Error;
use tracing::{debug, error, info, trace};

use super::{
    create_default_config,
    file::{check_path_is_file, create_config_file_with_defaults, CONFIG_FILE_PATH},
};
use crate::NL;

lazy_static! {
    #[derive(Debug)]
    pub static ref CONFIG: RwLock<configlib::Config> =
        RwLock::new(create_default_config());
}

#[tracing::instrument]
fn log_config() {
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

#[tracing::instrument]
fn load_config_file() {
    debug!("Load config file.");
    let mut config_guard = CONFIG.write();
    if let Err(err) = config_guard.merge(ConfigFile::with_name(&CONFIG_FILE_PATH)) {
        error!(
            message = concat!(
                "Failed to merge config file into config struct. ",
                "Settings config struct back to default config."
            ),
            error = ?err
        );
        // TODO:#i# send msg to err frontend saying to fix config and restart
        *config_guard = create_default_config();
    };
    log_config();
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

#[tracing::instrument]
fn watch_file() -> Result<(), FileWatchError> {
    trace!("Start watching config file.");
    let (tx, rx) = channel();

    let mut watcher: RecommendedWatcher = Watcher::new(tx, Duration::from_secs(2))?;
    watcher.watch(&CONFIG_FILE_PATH[..], RecursiveMode::NonRecursive)?;

    loop {
        match rx.recv() {
            Ok(DebouncedEvent::Write(_)) => {
                info!("config.toml updated. Refreshing configuration.");
                let mut config_guard = CONFIG.write();
                if let Err(err) = config_guard.refresh() {
                    error!(
                        message = concat!(
                            "Failed to update config. ",
                            "Probably invalid config file content."
                        ),
                        error = ?err
                    );
                    return Err(FileWatchError::ConfigUpdateError);
                }
                log_config();
            }
            Err(err) => error!(
                message = "Error while watching config file.",
                err = ?err
            ),
            _ => { /* Ignore other event */ }
        }
    }
}

#[tracing::instrument]
pub fn load_and_watch_config_file() {
    log_config();

    if !check_path_is_file(&CONFIG_FILE_PATH) {
        if let Err(err) = create_config_file_with_defaults() {
            error!(
                message = "Failed to create new config file with default config.",
                error = ?err
            );
            // TODO:#i# send err msg to frontend saying config could not be created
            // and prog will run on default conf
        }
    }

    if !check_path_is_file(&CONFIG_FILE_PATH) {
        load_config_file();

        if let Err(err) = watch_file() {
            match err {
                FileWatchError::WatcherInitError(err) => {
                    // TODO:#i# send err msg to frontend saying config file not watched
                    error!(
                        message = "Failed to initialize config file watcher.",
                        error = ?err
                    );
                }
                _ => {
                    // TODO:#i# send err msg to frontend with force close
                    error!("Failed to update config. Config watcher is broken.");
                }
            }
        }
    }
}
