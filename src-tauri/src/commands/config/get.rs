//! Commands to get data from the config state managed by tauri from the frontend
use std::collections::HashMap;

use crate::commands::CommandResult;
use crate::config::language::LanguageData;
use crate::config::theme::Theme;
use crate::config::{Config, AVAILABLE_LANGUAGES, AVAILABLE_THEMES};
use crate::logging::log_level::LogLevel;
use crate::logging::AVAILABLE_LOG_LEVELS;
use crate::state::ConfigState;

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_config_state(state: tauri::State<'_, ConfigState>) -> CommandResult<Config> {
    Ok(state.0.lock().clone())
}

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_language(state: tauri::State<'_, ConfigState>) -> CommandResult<LanguageData> {
    Ok(state.0.lock().settings.language.clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_languages() -> CommandResult<HashMap<&'static str, LanguageData>> {
    Ok((*AVAILABLE_LANGUAGES).clone())
}

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_log_level(state: tauri::State<'_, ConfigState>) -> CommandResult<LogLevel> {
    Ok(state.0.lock().settings.log_level.clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_log_levels() -> CommandResult<[&'static str; 5]> {
    Ok(*AVAILABLE_LOG_LEVELS)
}

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_theme(state: tauri::State<'_, ConfigState>) -> CommandResult<Theme> {
    Ok(state.0.lock().settings.theme.clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_themes() -> CommandResult<[&'static str; 2]> {
    Ok(*AVAILABLE_THEMES)
}
