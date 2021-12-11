//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::language::{Language, LanguageData};
use crate::config::log_level::LogLevel;
use crate::config::theme::Theme;
use crate::config::Config;
use crate::state::ConfigState;

#[tauri::command]
pub fn set_config_state(config: Config, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    *state_guard = config;
    state_guard.clone()
}

#[tauri::command]
pub fn set_db_uri(db_uri: String, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.database_uri = Some(db_uri);
    state_guard.clone()
}

#[tauri::command]
pub fn set_langauge(lang: Language, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.language = LanguageData::new(lang);
    state_guard.clone()
}

#[tauri::command]
pub fn set_log_level(level: LogLevel, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.log_level = level;
    state_guard.clone()
}

#[tauri::command]
pub fn set_theme(theme: Theme, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.theme = theme;
    state_guard.clone()
}
