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
