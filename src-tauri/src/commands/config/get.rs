//! Commands to get data from the config state managed by tauri from the frontend
use std::collections::HashMap;

use crate::{commands, config, logging, state};

#[tracing::instrument(skip(state))]
#[tauri::command]
pub async fn get_config_state(
    state: tauri::State<'_, state::ConfigState>,
) -> commands::CommandResult<config::Config> {
    Ok(state.0.lock().clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_languages(
) -> commands::CommandResult<HashMap<&'static str, config::LanguageData>> {
    Ok((*config::AVAILABLE_LANGUAGES).clone())
}

#[tracing::instrument]
#[tauri::command]
pub async fn get_available_log_levels() -> commands::CommandResult<[&'static str; 5]> {
    Ok(*logging::AVAILABLE_LOG_LEVELS)
}
