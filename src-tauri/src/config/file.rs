use std::{
    fs::{create_dir_all, File},
    io::Write,
    path::Path,
};

use std::{sync::mpsc::channel, time::Duration};

use configlib::File as ConfigFile;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};

use super::{
    create_default_config,
    utils::{log_config, ConfigFileError, FileWatchError},
    CONFIG, CONFIG_FILE_PATH, DEFAULT_CONFIG_TOML_NICE_STR,
};
use crate::{NL, PROJECT_DIRS};

pub fn get_conf_file_path() -> Result<String, ConfigFileError> {
    match &*PROJECT_DIRS {
        None => {
            error!("Could not find project directories for this OS.");
            Err(ConfigFileError::ProjectDirsNotFound)
        }
        Some(project_dirs) => {
            match project_dirs.config_dir().join("config.toml").to_str() {
                None => {
                    error!(concat!(
                        "Failed to build conf file path. ",
                        "Could not stringify the path."
                    ));
                    Err(ConfigFileError::PathStringify)
                }
                Some(path) => {
                    trace!("Built conf file path:{}{}", NL, path);
                    Ok(String::from(path))
                }
            }
        }
    }
}

#[tracing::instrument]
pub fn check_path_is_file(path: &str) -> bool {
    let is_file = Path::new(path).is_file();
    debug!("Path points to file: {}", is_file);
    is_file
}

#[tracing::instrument]
pub fn write_to_config_file(content: &str) -> Result<(), ConfigFileError> {
    trace!("Write to config file.{}Path: {:?}", NL, *CONFIG_FILE_PATH);
    let path = Path::new(&*CONFIG_FILE_PATH);
    trace!("Create parent dirs if missing.");
    if let Some(parent) = path.parent() {
        create_dir_all(parent)?
    }
    trace!("Create file if missing and open.");
    let mut file = File::create(path)?;
    trace!("Write to file.");
    write!(file, "{}", content)?;
    Ok(())
}

pub fn create_config_file_with_defaults() -> Result<(), ConfigFileError> {
    trace!("Create new config file with defaults.");
    write_to_config_file(&DEFAULT_CONFIG_TOML_NICE_STR)?;
    Ok(())
}

#[tracing::instrument]
pub fn load_config_file() {
    debug!("Load config file.");
    {
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
    }
    log_config();
}

#[tracing::instrument]
pub fn watch_config_file() -> Result<(), FileWatchError> {
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
