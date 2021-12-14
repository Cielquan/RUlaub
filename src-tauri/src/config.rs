pub mod file;
pub mod language;
pub mod parser;
pub mod setup;
pub mod theme;
pub mod types;

use self::file::get_conf_file_path;
pub use self::language::AVAILABLE_LANGUAGES;
pub use self::theme::AVAILABLE_THEMES;
pub use self::types::Config;
use crate::config::parser::{parse_toml_str_to_config, serialize_config_to_toml_str};

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
    pub static ref DEFAULT_CONFIG: Config = parse_toml_str_to_config(
        DEFAULT_CONFIG_TOML_STR
    ).unwrap();

    /// The default configuration for RUlaub as a nicer formatted TOML string.
    pub static ref DEFAULT_CONFIG_TOML_NICE_STR: String = serialize_config_to_toml_str(
        DEFAULT_CONFIG.clone()
    ).unwrap();

    /// The stringifyed path to the configuration file.
    ///
    /// Defaults to an empty string on error.
    pub static ref CONFIG_FILE_PATH: String = get_conf_file_path().unwrap_or_default();
}
