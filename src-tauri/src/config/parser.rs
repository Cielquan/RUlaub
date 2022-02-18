use crate::config;

/// Parse toml string into [`ConfigFile`] struct. Then transform it into [`Config`] struct.
pub fn parse_toml_str_to_config(toml_str: &str) -> anyhow::Result<config::Config> {
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
            Err(err.into())
        }
        Ok(conf) => Ok(config::Config::from_configfile(conf)),
    }
}

pub fn serialize_config_to_toml_str(config: &config::Config) -> anyhow::Result<String> {
    debug!(
        target = "config",
        message = "Try to serialize Config struct into toml string"
    );
    let config_file = config::types::ConfigFile::from_config(config.clone());
    match toml::to_string::<config::types::ConfigFile>(&config_file) {
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to serialize ConfigFile struct into toml string",
                config = ?config,
                config_file = ?config_file,
                error = ?err
            );
            Err(err.into())
        }
        Ok(conf) => Ok(conf),
    }
}
