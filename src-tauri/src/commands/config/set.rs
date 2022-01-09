//! Commands to set data from the config state managed by tauri from the frontend
use crate::commands::CommandResult;
use crate::config::file::write_to_config_file;
use crate::config::language::{Language, LanguageData};
use crate::config::parser::serialize_config_to_toml_str;
use crate::config::setup::ConfigSetupErr;
use crate::config::theme::Theme;
use crate::config::types::{StringEnum, User};
use crate::config::Config;
use crate::db::migrate_db_schema;
use crate::logging::log_level::LogLevel;
use crate::logging::tracer::reload_tracing_level;
use crate::state::{ConfigSetupErrState, ConfigState, TracerHandleState};

fn save_config_to_file(config: &Config) -> CommandResult<()> {
    trace!(target = "command", message = "Save config to file", config = ?config);
    match serialize_config_to_toml_str(config) {
        Err(_) => {
            return Err("config-serialize-error".into());
        }
        Ok(config_str) => {
            if write_to_config_file(&config_str).is_err() {
                return Err("config-file-write-error".into());
            }
        }
    }
    Ok(())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_config_state(
    config: Config,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();

    if *state_guard != config {
        trace!(
            target = "command",
            message = "Update whole config state",
            old = ?state_guard,
            new = ?config,
        );
        *state_guard = config;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

fn _set_db_uri(
    path: String,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();
    let path_ = Some(path);

    if state_guard.settings.database_uri != path_ {
        trace!(
            target = "command",
            message = "Update config state settings.database_uri",
            old = ?state_guard.settings.database_uri,
            new = ?path_,
        );
        state_guard.settings.database_uri = path_;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_db_uri(
    path: String,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    _set_db_uri(path, state, config_setup_err_state)
}

/// Create a new SQLite database for RUlaub.
#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn create_db(
    path: String,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    if migrate_db_schema(&path, true).is_err() {
        return Err("database-creation-error".into());
    }

    _set_db_uri(path, state, config_setup_err_state)
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_langauge(
    lang: Language,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();
    let lang_data = LanguageData::new(lang);

    if state_guard.settings.language != lang_data {
        trace!(
            target = "command",
            message = "Update config state settings.language",
            old = ?state_guard.settings.language,
            new = ?lang_data,
        );
        state_guard.settings.language = lang_data;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state, tracer_handle))]
#[tauri::command]
pub async fn set_log_level(
    level: LogLevel,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
    tracer_handle: tauri::State<'_, TracerHandleState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.log_level != level {
        trace!(
            target = "command",
            message = "Update config state settings.log_level",
            old = ?state_guard.settings.log_level,
            new = ?level,
        );
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
pub async fn set_theme(
    theme: Theme,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.theme != theme {
        trace!(
            target = "command",
            message = "Update config state settings.theme",
            old = ?state_guard.settings.theme,
            new = ?theme,
        );
        state_guard.settings.theme = theme;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_today_autoscroll_left_offset(
    offset: i32,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.today_autoscroll_left_offset != offset {
        trace!(
            target = "command",
            message = "Update config state settings.today_autoscroll_left_offset",
            old = ?state_guard.settings.today_autoscroll_left_offset,
            new = ?offset,
        );
        state_guard.settings.today_autoscroll_left_offset = offset;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_user_name(
    name: String,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();
    let user = Some(User { name: Some(name) });

    if state_guard.user != user {
        trace!(
            target = "command",
            message = "Update config state user",
            old = ?state_guard.user,
            new = ?user,
        );
        state_guard.user = user;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_year_change_scroll_begin(
    do_scroll: bool,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.year_change_scroll_begin != do_scroll {
        trace!(
            target = "command",
            message = "Update config state settings.year_change_scroll_begin",
            old = ?state_guard.settings.year_change_scroll_begin,
            new = ?do_scroll,
        );
        state_guard.settings.year_change_scroll_begin = do_scroll;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_year_to_show(
    year: i32,
    state: tauri::State<'_, ConfigState>,
    config_setup_err_state: tauri::State<'_, ConfigSetupErrState>,
) -> CommandResult<Config> {
    let mut state_guard = state.0.lock();
    let year_ = Some(year);

    if state_guard.settings.year_to_show != year_ {
        trace!(
            target = "command",
            message = "Update config state settings.year_to_show",
            old = ?state_guard.settings.year_to_show,
            new = ?year_,
        );
        state_guard.settings.year_to_show = year_;

        if *config_setup_err_state.0.lock() == ConfigSetupErr::None {
            save_config_to_file(&state_guard)?
        };
    }

    Ok(state_guard.clone())
}
