mod file;
mod language;
mod log_level;
pub mod setup;
pub mod theme;
pub mod types;
mod util;

use self::file::get_conf_file_path;
pub use self::types::Config;

// NOTE: Change defaults also in frontend initial State
/// Default configuration of RUlaub as TOML string.
pub const DEFAULT_CONFIG_TOML_STR: &str = r#"
settings.language = "de-DE"
settings.log_level = "INFO"
settings.theme = "dark"
settings.today_autoscroll_left_offset = 2
settings.year_change_scroll_begin = true
"#;

// NOTE: `unwrap` shall never trigger as the string above is always the same
lazy_static! {
    /// The default configuration for RUlaub.
    #[derive(Debug)]
    pub static ref DEFAULT_CONFIG: Config = toml::from_str(DEFAULT_CONFIG_TOML_STR).unwrap();

    /// The default configuration for RUlaub as a nicer formatted TOML string.
    pub static ref DEFAULT_CONFIG_TOML_NICE_STR: String = toml::to_string::<Config>(&DEFAULT_CONFIG).unwrap();

    /// The stringifyed path to the configuration file.
    ///
    /// Defaults to an empty string on error.
    pub static ref CONFIG_FILE_PATH: String = get_conf_file_path().unwrap_or_default();
}
