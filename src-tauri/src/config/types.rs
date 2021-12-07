use super::language::Language;
use super::log_level::LogLevel;
use super::theme::Theme;


/// The configuration object.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Config {
    pub user: Option<User>,
    pub settings: Settings,
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
