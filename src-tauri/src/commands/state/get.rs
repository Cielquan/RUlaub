//! Commands to get data from the state managed by tauri from the frontend
use crate::config::language::LanguageData;
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
pub fn get_config_state(state: tauri::State<ConfigState>) -> Config {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_language(state: tauri::State<ConfigState>) -> LanguageData {
    state.0.lock().settings.language.clone()
}

#[tauri::command]
pub fn get_theme(state: tauri::State<ConfigState>) -> Theme {
    state.0.lock().settings.theme.clone()
}

#[tauri::command]
pub fn get_public_holidays_state(state: tauri::State<PublicHolidaysState>) -> PublicHolidays {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_school_holidays_state(state: tauri::State<SchoolHolidaysState>) -> SchoolHolidays {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_user_row_map_state(state: tauri::State<UserRowMapState>) -> UserRowMap {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_users_state(state: tauri::State<UsersState>) -> Users {
    state.0.lock().clone()
}

#[tauri::command]
pub fn get_vacation_types_state(state: tauri::State<VacationTypesState>) -> VacationTypes {
    state.0.lock().clone()
}
