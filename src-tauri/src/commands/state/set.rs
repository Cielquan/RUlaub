//! Commands to set data from the state managed by tauri from the frontend
use crate::config::language::{Language, LanguageData};
use crate::config::log_level::LogLevel;
use crate::config::theme::Theme;
use crate::config::Config;
use crate::state::public_holidays::PublicHolidays;
use crate::state::school_holidays::SchoolHolidays;
use crate::state::user_row_map::UserRowMap;
use crate::state::users::Users;
use crate::state::vacation_types::VacationTypes;
use crate::state::{
    ConfigState, PublicHolidaysState, SchoolHolidaysState, UserRowMapState, UsersState,
    VacationTypesState,
};

#[tauri::command]
pub fn set_config_state(data: Config, state: tauri::State<ConfigState>) {
    *state.0.lock() = data;
}

#[tauri::command]
pub fn set_db_uri(data: String, state: tauri::State<ConfigState>) {
    state.0.lock().settings.database_uri = Some(data);
}

#[tauri::command]
pub fn set_langauge(data: Language, state: tauri::State<ConfigState>) {
    state.0.lock().settings.language = LanguageData::new(data);
}

#[tauri::command]
pub fn set_log_level(data: LogLevel, state: tauri::State<ConfigState>) {
    state.0.lock().settings.log_level = data;
}

#[tauri::command]
pub fn set_theme(data: Theme, state: tauri::State<ConfigState>) {
    state.0.lock().settings.theme = data;
}

#[tauri::command]
pub fn set_public_holidays_state(data: PublicHolidays, state: tauri::State<PublicHolidaysState>) {
    *state.0.lock() = data;
}

#[tauri::command]
pub fn set_school_holidays_state(data: SchoolHolidays, state: tauri::State<SchoolHolidaysState>) {
    *state.0.lock() = data;
}

#[tauri::command]
pub fn set_user_row_map_state(data: UserRowMap, state: tauri::State<UserRowMapState>) {
    *state.0.lock() = data;
}

#[tauri::command]
pub fn set_users_state(data: Users, state: tauri::State<UsersState>) {
    *state.0.lock() = data;
}

#[tauri::command]
pub fn set_vacation_types_state(data: VacationTypes, state: tauri::State<VacationTypesState>) {
    *state.0.lock() = data;
}
