//! Commands to set data from the config state managed by tauri from the frontend
use crate::config::types::StringEnum;
use crate::{commands, config, db, logging, state};

fn save_config_to_file(
    config: &config::Config,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<()> {
    let config_setup_err_state_guard = config_setup_err_state.0.lock();
    if *config_setup_err_state_guard != config::setup::ConfigSetupErr::None {
        trace!(
            target = "command",
            message = "Abort save config to file because of setup error",
            error = ?*config_setup_err_state_guard,
        );
        return Err("config-not-saved-warn".into());
    }

    trace!(target = "command", message = "Save config to file", config = ?config);
    match config::parser::serialize_config_to_toml_str(config) {
        Err(_) => {
            return Err("config-serialize-error".into());
        }
        Ok(config_str) => {
            if config::file::write_to_config_file(&config_str).is_err() {
                return Err("config-file-write-error".into());
            }
        }
    }
    Ok(())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_config_state(
    config: config::Config,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();

    if *state_guard != config {
        trace!(
            target = "command",
            message = "Update whole config state",
            old = ?state_guard,
            new = ?config,
        );
        *state_guard = config;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

fn _set_db_uri(
    path: String,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
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

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_db_uri(
    path: String,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    _set_db_uri(path, state, config_setup_err_state)
}

/// Create a new SQLite database for RUlaub.
#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn create_db(
    path: String,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    if db::migrate_db_schema(&path, true).is_err() {
        return Err("database-creation-error".into());
    }

    _set_db_uri(path, state, config_setup_err_state)
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_langauge(
    lang: config::Language,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();
    let lang_data = config::LanguageData::new(lang);

    if state_guard.settings.language != lang_data {
        trace!(
            target = "command",
            message = "Update config state settings.language",
            old = ?state_guard.settings.language,
            new = ?lang_data,
        );
        state_guard.settings.language = lang_data;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state, tracer_handle))]
#[tauri::command]
pub async fn set_log_level(
    level: logging::log_level::LogLevel,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
    tracer_handle: tauri::State<'_, state::TracerHandleState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.log_level != level {
        trace!(
            target = "command",
            message = "Update config state settings.log_level",
            old = ?state_guard.settings.log_level,
            new = ?level,
        );
        state_guard.settings.log_level = level.clone();

        logging::tracer::reload_tracing_level(&tracer_handle.0.lock(), &level.to_string());

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_theme(
    theme: config::Theme,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.theme != theme {
        trace!(
            target = "command",
            message = "Update config state settings.theme",
            old = ?state_guard.settings.theme,
            new = ?theme,
        );
        state_guard.settings.theme = theme;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_today_autoscroll_left_offset(
    offset: i32,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.today_autoscroll_left_offset != offset {
        trace!(
            target = "command",
            message = "Update config state settings.today_autoscroll_left_offset",
            old = ?state_guard.settings.today_autoscroll_left_offset,
            new = ?offset,
        );
        state_guard.settings.today_autoscroll_left_offset = offset;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_user_name(
    name: String,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();
    let user = Some(config::types::User { name: Some(name) });

    if state_guard.user != user {
        trace!(
            target = "command",
            message = "Update config state user",
            old = ?state_guard.user,
            new = ?user,
        );
        state_guard.user = user;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_year_change_scroll_begin(
    do_scroll: bool,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
    let mut state_guard = state.0.lock();

    if state_guard.settings.year_change_scroll_begin != do_scroll {
        trace!(
            target = "command",
            message = "Update config state settings.year_change_scroll_begin",
            old = ?state_guard.settings.year_change_scroll_begin,
            new = ?do_scroll,
        );
        state_guard.settings.year_change_scroll_begin = do_scroll;

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}

#[tracing::instrument(skip(state, config_setup_err_state))]
#[tauri::command]
pub async fn set_year_to_show(
    year: i32,
    state: tauri::State<'_, state::ConfigState>,
    config_setup_err_state: tauri::State<'_, state::ConfigSetupErrState>,
) -> commands::CommandResult<config::Config> {
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

        save_config_to_file(&state_guard, config_setup_err_state)?
    }

    Ok(state_guard.clone())
}
