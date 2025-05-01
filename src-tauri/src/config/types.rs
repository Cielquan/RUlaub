use crate::{config, logging};

/// The configuration object.
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
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
                language: config::LanguageData::new(config_file.settings.language),
                log_level: config_file.settings.log_level,
                theme: config_file.settings.theme,
                year_change_scroll_begin: config_file.settings.year_change_scroll_begin,
                year_to_show: config_file.settings.year_to_show,
            },
        }
    }
}

/// The user specific part of the confiuration.
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub name: Option<String>,
}

/// The application specific part of the confiuration.
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    pub database_uri: Option<String>,
    pub language: config::LanguageData,
    pub log_level: logging::log_level::LogLevel,
    pub theme: config::Theme,
    pub year_change_scroll_begin: bool,
    pub year_to_show: Option<i32>,
}

/// The configuration object from the file.
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct ConfigFile {
    pub user: Option<User>,
    pub settings: SettingsConfigFile,
}

impl ConfigFile {
    pub fn from_config(config: Config) -> Self {
        ConfigFile {
            user: config.user.clone(),
            settings: SettingsConfigFile {
                database_uri: config.settings.database_uri,
                language: config::Language::from_languagedata(config.settings.language),
                log_level: config.settings.log_level,
                theme: config.settings.theme,
                year_change_scroll_begin: config.settings.year_change_scroll_begin,
                year_to_show: config.settings.year_to_show,
            },
        }
    }
}

/// The application specific part of the confiuration from the file.
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct SettingsConfigFile {
    pub database_uri: Option<String>,
    pub language: config::Language,
    pub log_level: logging::log_level::LogLevel,
    pub theme: config::Theme,
    pub year_change_scroll_begin: bool,
    pub year_to_show: Option<i32>,
}

pub trait StringEnum {
    fn new(value: &str) -> Self;
    fn to_string(&self) -> String;
}
