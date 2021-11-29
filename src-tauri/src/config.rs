mod file;
pub mod setup;

pub mod util;

use parking_lot::RwLock;

use self::{file::get_conf_file_path, util::create_default_config};

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    name: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Settings {
    database_uri: Option<String>,
    language: String,
    log_level: String,
    theme: String,
    today_autoscroll_left_offset: i32,
    year_change_scroll_begin: bool,
    year_to_show: Option<i32>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
    user: Option<User>,
    settings: Settings,
}

// NOTE: Change defaults also in frontend initial State
pub const DEFAULT_CONFIG_TOML_STR: &str = r#"
settings.language = "de-DE"
settings.log_level = "INFO"
settings.theme = "dark"
settings.today_autoscroll_left_offset = 2
settings.year_change_scroll_begin = true
"#;

// NOTE: `unwrap` shall never trigger as the string above is always the same
lazy_static! {
    pub static ref DEFAULT_CONFIG_TOML_NICE_STR: String =
        toml::to_string::<Config>(&toml::from_str(DEFAULT_CONFIG_TOML_STR).unwrap())
        .unwrap();

    pub static ref CONFIG_FILE_PATH: String = get_conf_file_path().unwrap_or_default();

    #[derive(Debug)]
    pub static ref CONFIG: RwLock<configlib::Config> =
        RwLock::new(create_default_config());
}
