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
