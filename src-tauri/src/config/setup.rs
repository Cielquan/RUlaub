use std::path::Path;

use super::{
    file::{load_config_file, watch_config_file, write_to_config_file},
    util::log_config,
    CONFIG, CONFIG_FILE_PATH, DEFAULT_CONFIG_TOML_NICE_STR,
};

#[tracing::instrument]
pub fn setup_config() {
    trace!(target = "config", "Init config.");
    let _ = &CONFIG;

    trace!(target = "config", "Init config file path.");
    let conf_file_path = CONFIG_FILE_PATH.as_str();
    trace!(
        target = "config",
        message = "Use config file path.",
        path = conf_file_path
    );

    log_config();

    trace!(
        target = "config",
        "Check if config file exists or needs to be created."
    );
    if !Path::new(conf_file_path).is_file() {
        trace!(target = "config", "Create new config file with defaults.");
        if let Err(err) = write_to_config_file(&DEFAULT_CONFIG_TOML_NICE_STR) {
            error!(
                target = "config",
                message = "Failed to create new config file with default config.",
                error = ?err
            );
            // TODO:#i# send err msg to frontend saying config could not be created
            // and prog will run on default conf
        }
    }

    trace!(
        target = "config",
        "Check if config file exists (was created) for watching."
    );
    if Path::new(conf_file_path).is_file() {
        load_config_file();

        trace!(target = "config", "Spawn task for async file watching.");
        tauri::async_runtime::spawn(async { watch_config_file().await });
    } else {
        error!(target = "config", "No conf file to watch.");
    }
}
