use super::{CONFIG, DEFAULT_CONFIG_TOML_STR};

/// Log the current [`CONFIG`].
pub fn log_config() {
    trace!(target = "config", "Log current config.");
    debug!(target = "config", message = "Loaded config.", config = ?CONFIG.read().clone());
}

/// Create a default configuration object.
///
/// Parses [`DEFAULT_CONFIG_TOML_STR`].
pub fn create_default_config() -> configlib::Config {
    trace!(target = "config", "Create default config struct.");
    let conf_vars = DEFAULT_CONFIG_TOML_STR
        .split('\n')
        .filter(|s| s != &"")
        .map(|s| s.split(" = ").collect::<Vec<&str>>());
    let mut config = configlib::Config::default();
    for c in conf_vars {
        config.set(c[0], c[1]).unwrap();
    }
    config
}
