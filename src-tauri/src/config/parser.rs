use crate::config::types::ConfigFile;

use super::Config;

/// Parse toml string into [`ConfigFile`] struct. Then transform it into [`Config`] struct.
pub fn parse_toml_str_to_config(toml_str: &str) -> anyhow::Result<Config> {
    debug!(
        target = "config",
        message = "Try to parse toml string into Config struct"
    );
    match toml::from_str(toml_str) {
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to parse toml string into ConfigFile struct",
                error = ?err
            );
            return Err(err.into());
        }
        Ok(conf) => Ok(Config::from_configfile(conf)),
    }
}

pub fn serialize_config_to_toml_str(config: &Config) -> anyhow::Result<String> {
    debug!(
        target = "config",
        message = "Try to serialize Config struct into toml string"
    );
    let config_file = ConfigFile::from_config(config.clone());
    match toml::to_string::<ConfigFile>(&config_file) {
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to serialize ConfigFile struct into toml string",
                config = ?config,
                config_file = ?config_file,
                error = ?err
            );
            return Err(err.into());
        }
        Ok(conf) => Ok(conf),
    }
}
