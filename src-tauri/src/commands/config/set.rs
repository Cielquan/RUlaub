//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::file::write_to_config_file;
use crate::config::language::{Language, LanguageData};
use crate::config::parser::serialize_config_to_toml_str;
use crate::config::setup::ConfigSetupErr;
use crate::config::theme::Theme;
use crate::config::types::User;
use crate::config::Config;
use crate::logging::log_level::LogLevel;
use crate::state::{ConfigSetupErrState, ConfigState};

fn save_config_to_file(config: &Config) -> Result<(), String> {
    match serialize_config_to_toml_str(config) {
        Err(_) => {
            return Err("config-serialize".into());
        }
        Ok(config_str) => {
            if let Err(_) = write_to_config_file(&config_str) {
                return Err("config-file-write".into());
            }
        }
    }
    Ok(())
}

#[tauri::command]
pub fn set_config_state(
    config: Config,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    *state_guard = config;

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_db_uri(
    path: String,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.database_uri = Some(path);

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_langauge(
    lang: Language,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.language = LanguageData::new(lang);

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_log_level(
    level: LogLevel,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.log_level = level;

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_theme(
    theme: Theme,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.theme = theme;

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_today_autoscroll_left_offset(
    offset: i32,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.today_autoscroll_left_offset = offset;

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_user_name(
    name: String,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.user = Some(User { name: Some(name) });

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_year_change_scroll_begin(
    do_scroll: bool,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.year_change_scroll_begin = do_scroll;

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}

#[tauri::command]
pub fn set_year_to_show(
    year: i32,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    state_guard.settings.year_to_show = Some(year);

    if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
        save_config_to_file(&state_guard)?
    };

    Ok(state_guard.clone())
}
