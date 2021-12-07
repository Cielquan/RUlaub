use super::language::{Language, LanguageData};
use super::log_level::LogLevel;
use super::theme::Theme;

/// The configuration object.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Config {
    pub user: Option<User>,
    pub settings: Settings,
}

impl Config {
    pub fn from_configfile(config_file: ConfigFile) -> Self {
        Config {
            user: config_file.user.clone(),
            settings: Settings {
                database_uri: config_file.settings.database_uri,
                language: LanguageData::new(config_file.settings.language),
                log_level: config_file.settings.log_level,
                theme: config_file.settings.theme,
                today_autoscroll_left_offset: config_file.settings.today_autoscroll_left_offset,
                year_change_scroll_begin: config_file.settings.year_change_scroll_begin,
                year_to_show: config_file.settings.year_to_show,
            },
        }
    }
}

/// The user specific part of the confiuration.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct User {
    pub name: Option<String>,
}

/// The application specific part of the confiuration.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Settings {
    pub database_uri: Option<String>,
    pub language: LanguageData,
    pub log_level: LogLevel,
    pub theme: Theme,
    pub today_autoscroll_left_offset: i32,
    pub year_change_scroll_begin: bool,
    pub year_to_show: Option<i32>,
}

/// The configuration object from the file.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ConfigFile {
    pub user: Option<User>,
    pub settings: SettingsConfigFile,
}

/// The application specific part of the confiuration from the file.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SettingsConfigFile {
    pub database_uri: Option<String>,
    pub language: Language,
    pub log_level: LogLevel,
    pub theme: Theme,
    pub today_autoscroll_left_offset: i32,
    pub year_change_scroll_begin: bool,
    pub year_to_show: Option<i32>,
}

pub trait StringEnum {
    fn new(value: &str) -> Self;
    fn to_string(&self) -> String;
}
