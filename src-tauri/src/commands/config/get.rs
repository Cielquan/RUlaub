//! Commands to get data from the config state managed by tauri from the frontend
use std::collections::HashMap;

use crate::config::language::LanguageData;
use crate::config::log_level::LogLevel;
use crate::config::theme::Theme;
use crate::config::{Config, AVAILABLE_LANGUAGES, AVAILABLE_LOG_LEVELS, AVAILABLE_THEMES};
use crate::state::ConfigState;

#[tauri::command]
pub fn get_config_state(state: tauri::State<ConfigState>) -> Config {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_language(state: tauri::State<ConfigState>) -> LanguageData {
    state.0.lock().settings.language.clone()
}

#[tauri::command]
pub fn get_available_languages() -> HashMap<&'static str, LanguageData> {
    (*AVAILABLE_LANGUAGES).clone()
}

#[tauri::command]
pub fn get_log_level(state: tauri::State<ConfigState>) -> LogLevel {
    state.0.lock().settings.log_level.clone()
}

#[tauri::command]
pub fn get_available_log_levels() -> [&'static str; 5] {
    *AVAILABLE_LOG_LEVELS
}

#[tauri::command]
pub fn get_theme(state: tauri::State<ConfigState>) -> Theme {
    state.0.lock().settings.theme.clone()
}

#[tauri::command]
pub fn get_available_themes() -> [&'static str; 2] {
    *AVAILABLE_THEMES
}
