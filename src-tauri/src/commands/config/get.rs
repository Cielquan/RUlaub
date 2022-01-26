//! Commands to get data from the config state managed by tauri from the frontend
use std::collections::HashMap;

use crate::commands::CommandResult;
use crate::config::language::LanguageData;
use crate::config::{Config, AVAILABLE_LANGUAGES};
use crate::logging::AVAILABLE_LOG_LEVELS;
use crate::state::ConfigState;

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_config_state(state: tauri::State<'_, ConfigState>) -> CommandResult<Config> {
    Ok(state.0.lock().clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_languages() -> CommandResult<HashMap<&'static str, LanguageData>> {
    Ok((*AVAILABLE_LANGUAGES).clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_log_levels() -> CommandResult<[&'static str; 5]> {
    Ok(*AVAILABLE_LOG_LEVELS)
}
