use std::path::Path;

use super::file::{load_config_file, write_to_config_file};
use super::{Config, CONFIG_FILE_PATH, DEFAULT_CONFIG_TOML_NICE_STR};

/// Initialize and load a configuration file.
///
/// Load an existing configuration file or create one (incl. parrent directories) with the
/// default configuration if none is found.
#[tracing::instrument]
pub fn setup_config() -> Option<Config> {
    trace!(target = "config", "Init config file path");
    let conf_file_path = CONFIG_FILE_PATH.as_str();
    trace!(
        target = "config",
        message = "Use config file path",
        path = conf_file_path
    );

    trace!(
        target = "config",
        "Check if config file exists or needs to be created"
    );
    if !Path::new(conf_file_path).is_file() {
        trace!(target = "config", "Create new config file with defaults");
        if let Err(err) = write_to_config_file(&DEFAULT_CONFIG_TOML_NICE_STR) {
            error!(
                target = "config",
                message = "Failed to create new config file with default config",
                error = ?err
            );
        }
    }

    trace!(
        target = "config",
        "Check if config file exists (was created) for loading"
    );
    if Path::new(conf_file_path).is_file() {
        match load_config_file() {
            Ok(config) => return Some(config),
            Err(err) => error!(
                target = "config",
                message = "Failed to load configuration from file",
                error = ?err
            ),
        }
    } else {
        error!(target = "config", "No conf file to load");
    }
    None
}
