//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::language::{Language, LanguageData};
use crate::config::log_level::LogLevel;
use crate::config::theme::Theme;
use crate::config::Config;
use crate::state::ConfigState;

#[tauri::command]
pub fn set_config_state(config: Config, state: tauri::State<ConfigState>) {
    *state.0.lock() = config;
}

#[tauri::command]
pub fn set_db_uri(db_uri: String, state: tauri::State<ConfigState>) {
    state.0.lock().settings.database_uri = Some(db_uri);
}

#[tauri::command]
pub fn set_langauge(lang: Language, state: tauri::State<ConfigState>) {
    state.0.lock().settings.language = LanguageData::new(lang);
}

#[tauri::command]
pub fn set_log_level(level: LogLevel, state: tauri::State<ConfigState>) {
    state.0.lock().settings.log_level = level;
}

#[tauri::command]
pub fn set_theme(theme: Theme, state: tauri::State<ConfigState>) {
    state.0.lock().settings.theme = theme;
}
