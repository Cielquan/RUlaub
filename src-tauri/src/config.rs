mod file;
pub mod setup;

pub mod util;

use self::file::get_conf_file_path;

/// The user specific part of the confiuration.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct User {
    pub name: Option<String>,
}

/// The application specific part of the confiuration.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Settings {
    pub database_uri: Option<String>,
    pub language: String,
    pub log_level: String,
    pub theme: String,
    pub today_autoscroll_left_offset: i32,
    pub year_change_scroll_begin: bool,
    pub year_to_show: Option<i32>,
}

/// The configuration object.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Config {
    pub user: Option<User>,
    pub settings: Settings,
}

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
