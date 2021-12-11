//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::language::{Language, LanguageData};
use crate::config::log_level::LogLevel;
use crate::config::theme::Theme;
use crate::config::types::User;
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

#[tauri::command]
pub fn set_today_autoscroll_left_offset(offset: i32, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.today_autoscroll_left_offset = offset;
    state_guard.clone()
}

#[tauri::command]
pub fn set_user_name(name: String, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.user = Some(User { name: Some(name) });
    state_guard.clone()
}

#[tauri::command]
pub fn set_year_change_scroll_begin(do_scroll: bool, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.year_change_scroll_begin = do_scroll;
    state_guard.clone()
}

#[tauri::command]
pub fn set_year_to_show(year: i32, state: tauri::State<ConfigState>) -> Config {
    let mut state_guard = state.0.lock();
    state_guard.settings.year_to_show = Some(year);
    state_guard.clone()
}
