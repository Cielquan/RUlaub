use crate::util::enum_serde::EnumStringConverter;

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

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum Language {
    DE,
    EN,
}

impl EnumStringConverter for Language {
    fn to_string(&self) -> String {
        match *self {
            Language::DE => "de-DE".to_string(),
            Language::EN => "en-US".to_string(),
        }
    }

    fn to_enum(value: &str) -> Self {
        match value {
            "de-DE" => Language::DE,
            "en-US" => Language::EN,
            _ => Language::DE,
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
}

impl EnumStringConverter for LogLevel {
    fn to_string(&self) -> String {
        match *self {
            LogLevel::TRACE => "trace".to_string(),
            LogLevel::DEBUG => "debug".to_string(),
            LogLevel::INFO => "info".to_string(),
            LogLevel::WARN => "warn".to_string(),
            LogLevel::ERROR => "error".to_string(),
        }
    }

    fn to_enum(value: &str) -> Self {
        match value {
            "trace" => LogLevel::TRACE,
            "debug" => LogLevel::DEBUG,
            "info" => LogLevel::INFO,
            "warn" => LogLevel::WARN,
            "error" => LogLevel::ERROR,
            _ => LogLevel::INFO,
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum Theme {
    DARK,
    LIGHT,
}

impl EnumStringConverter for Theme {
    fn to_string(&self) -> String {
        match *self {
            Theme::DARK => "dark".to_string(),
            Theme::LIGHT => "light".to_string(),
        }
    }

    fn to_enum(value: &str) -> Self {
        match value {
            "dark" => Theme::DARK,
            "light" => Theme::LIGHT,
            _ => Theme::DARK,
        }
    }
}
