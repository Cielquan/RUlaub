//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::file::write_to_config_file;
use crate::config::language::{Language, LanguageData};
use crate::config::parser::serialize_config_to_toml_str;
use crate::config::setup::ConfigSetupErr;
use crate::config::theme::Theme;
use crate::config::types::{StringEnum, User};
use crate::config::Config;
use crate::logging::log_level::LogLevel;
use crate::logging::tracer::reload_tracing_level;
use crate::state::{ConfigSetupErrState, ConfigState, TracerHandleState};

fn save_config_to_file(config: &Config) -> Result<(), String> {
    trace!(target = "command", message = "Save config to file", config = ?config);
    match serialize_config_to_toml_str(config) {
        Err(_) => {
            return Err("config-serialize".into());
        }
        Ok(config_str) => {
            if write_to_config_file(&config_str).is_err() {
                return Err("config-file-write".into());
            }
        }
    }
    Ok(())
}
#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_config_state(
    config: Config,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    trace!(target = "command", message = "");
    let mut state_guard = state.0.lock();

    if *state_guard != config {
        *state_guard = config;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_db_uri(
    path: String,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    let path_ = Some(path);

    if state_guard.settings.database_uri != path_ {
        state_guard.settings.database_uri = path_;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_langauge(
    lang: Language,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    let lang_data = LanguageData::new(lang);

    if state_guard.settings.language != lang_data {
        state_guard.settings.language = lang_data;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state, tracer_handle))]
#[tauri::command]
pub fn set_log_level(
    level: LogLevel,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
    tracer_handle: tauri::State<TracerHandleState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.log_level != level {
        state_guard.settings.log_level = level.clone();

        reload_tracing_level(&tracer_handle.0.lock(), &level.to_string());

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_theme(
    theme: Theme,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.theme != theme {
        state_guard.settings.theme = theme;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_today_autoscroll_left_offset(
    offset: i32,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.today_autoscroll_left_offset != offset {
        state_guard.settings.today_autoscroll_left_offset = offset;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_user_name(
    name: String,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();
    let user = Some(User { name: Some(name) });

    if state_guard.user != user {
        state_guard.user = user;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_year_change_scroll_begin(
    do_scroll: bool,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.year_change_scroll_begin != do_scroll {
        state_guard.settings.year_change_scroll_begin = do_scroll;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub fn set_year_to_show(
    year: i32,
    state: tauri::State<ConfigState>,
    config_setup_err_state: tauri::State<ConfigSetupErrState>,
) -> Result<Config, String> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.year_to_show != Some(year) {
        state_guard.settings.year_to_show = Some(year);

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}
