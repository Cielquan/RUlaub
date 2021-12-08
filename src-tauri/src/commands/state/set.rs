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
pub fn set_config_state(config: Config, state: tauri::State<ConfigState>) {
    *state.0.lock() = config;
}

#[tauri::command]
pub fn set_db_uri(db_uri: String, state: tauri::State<ConfigState>) {
    state.0.lock().settings.database_uri = Some(db_uri);
}

#[tauri::command]
pub fn set_langauge(lang: Language, state: tauri::State<ConfigState>) {
    state.0.lock().settings.language = LanguageData::new(lang);
}

#[tauri::command]
pub fn set_log_level(level: LogLevel, state: tauri::State<ConfigState>) {
    state.0.lock().settings.log_level = level;
}

#[tauri::command]
pub fn set_theme(theme: Theme, state: tauri::State<ConfigState>) {
    state.0.lock().settings.theme = theme;
}

#[tauri::command]
pub fn set_public_holidays_state(pub_holiday: PublicHolidays, state: tauri::State<PublicHolidaysState>) {
    *state.0.lock() = pub_holiday;
}

#[tauri::command]
pub fn set_school_holidays_state(school_holiday: SchoolHolidays, state: tauri::State<SchoolHolidaysState>) {
    *state.0.lock() = school_holiday;
}

#[tauri::command]
pub fn set_user_row_map_state(user_row_map: UserRowMap, state: tauri::State<UserRowMapState>) {
    *state.0.lock() = user_row_map;
}

#[tauri::command]
pub fn set_users_state(users: Users, state: tauri::State<UsersState>) {
    *state.0.lock() = users;
}

#[tauri::command]
pub fn set_vacation_types_state(vac_types: VacationTypes, state: tauri::State<VacationTypesState>) {
    *state.0.lock() = vac_types;
}
