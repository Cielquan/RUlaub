use std::{
    collections::HashMap,
    sync::{mpsc::channel, RwLock},
    time::Duration,
};

use configlib::File as ConfigFile;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};
use thiserror::Error;
use tracing::{debug, error, info, trace};

use super::{
    create_default_config,
    file::{check_path_is_file, create_config_file_with_defaults, CONFIG_FILE_PATH},
};
use crate::NL;

lazy_static! {
    #[derive(Debug)]
    pub static ref CONFIG: RwLock<configlib::Config> = RwLock::new(create_default_config());
}

#[derive(Error, Debug)]
pub enum ConfigError {
    // #[error("Could not stringify config file path.")]
// PathStringify,
}

fn log_config() {
    trace!("Log current config.");
    match CONFIG.read() {
        Err(_) => {
            error!("Failed the read current config. Read access to RwLock failed.")
        }

        Ok(config_guard) => {
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
    }
}

fn load_config_file() {
    debug!("Load config file.");
    match CONFIG.write() {
        Err(_) => {
            let err = concat!(
                "Failed the change current config. ",
                "Write access to RwLock failed."
            );
            error!(err);
            panic!("{}", err);
        }

        Ok(mut config_guard) => {
            if let Err(_) = config_guard.merge(ConfigFile::with_name(&CONFIG_FILE_PATH))
            {
                error!(concat!(
                    "Failed to merge config file into config struct. ",
                    "Settings config struct back to default config."
                ));
                // TODO:#i# send msg to err frontend saying to fix config and restart
                *config_guard = create_default_config();
            };
            log_config();
        }
    }
}

fn watch_file() {
    trace!("Start watching config file.");
    let (tx, rx) = channel();

    let mut watcher: RecommendedWatcher =
        Watcher::new(tx, Duration::from_secs(2)).unwrap(); // TODO: handle unwrap properly

    watcher
        .watch(&CONFIG_FILE_PATH[..], RecursiveMode::NonRecursive)
        .unwrap(); // TODO: handle unwrap properly

    // This is a simple loop, but you may want to use more complex logic here,
    // for example to handle I/O.
    loop {
        match rx.recv() {
            Ok(DebouncedEvent::Write(_)) => {
                info!("config.toml updated. Refreshing configuration.");
                CONFIG.write().unwrap().refresh().unwrap(); // TODO: handle unwrap properly
                log_config();
            }
            Err(e) => error!("Error while watching config file: {:?}", e),
            _ => { /* Ignore other event */ }
        }
    }
}

pub fn load_and_watch_config_file() {
    log_config();

    if !check_path_is_file(&CONFIG_FILE_PATH) {
        if let Err(_) = create_config_file_with_defaults() {
            error!("Failed to create new config file with default config.");
            // TODO:#i# send msg to err frontend saying config could not created
            // and prog will run on default conf
        }
    }

    load_config_file();

    // TODO: Outource watcher to 2nd thread
    watch_file();
}
