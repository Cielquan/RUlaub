use std::path;

use crate::config;

#[derive(Debug, PartialEq)]
pub enum ConfigSetupErr {
    None,
    WriteErr,
    ReadErr,
    NoFileErr,
}

/// Initialize and load a configuration file.
///
/// Load an existing configuration file or create one (incl. parrent directories) with the
/// default configuration if none is found.
#[tracing::instrument]
pub fn setup_config() -> Result<config::Config, ConfigSetupErr> {
    trace!(target = "config", message = "Init config file path");
    let conf_file_path = config::CONFIG_FILE_PATH.as_str();
    trace!(
        target = "config",
        message = "Use config file path",
        path = conf_file_path
    );

    trace!(
        target = "config",
        message = "Check if config file exists or needs to be created"
    );
    if !path::Path::new(conf_file_path).is_file() {
        trace!(
            target = "config",
            message = "Create new config file with defaults"
        );
        if let Err(err) = config::file::write_to_config_file(&config::DEFAULT_CONFIG_TOML_NICE_STR)
        {
            error!(
                target = "config",
                message = "Failed to create new config file with default config",
                error = ?err
            );
            return Err(ConfigSetupErr::WriteErr);
        }
    }

    trace!(
        target = "config",
        message = "Check if config file exists (was created) for loading"
    );
    if path::Path::new(conf_file_path).is_file() {
        match config::file::load_config_file() {
            Ok(config) => return Ok(config),
            Err(err) => {
                error!(
                    target = "config",
                    message = "Failed to load configuration from file",
                    error = ?err
                );
                return Err(ConfigSetupErr::ReadErr);
            }
        }
    }
    error!(target = "config", message = "No conf file to load");
    Err(ConfigSetupErr::NoFileErr)
}
