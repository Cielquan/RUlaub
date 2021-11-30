use super::{Config, CONFIG};

/// Log the current [`CONFIG`].
pub fn log_config() {
    debug!(target = "config", message = "Log current config", config = ?&CONFIG.read());
}

/// Parse toml string into [`Config`] struct.
pub fn parse_toml_str_to_config(toml_str: &str) -> anyhow::Result<Config> {
    trace!(
        target = "config",
        "Try to parse toml string into Config struct"
    );
    match toml::from_str(toml_str) {
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to parse toml string into Config struct",
                error = ?err
            );
            return Err(err.into());
        }
        Ok(conf) => Ok(conf),
    }
}
