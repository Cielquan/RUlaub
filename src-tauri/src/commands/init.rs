use crate::state::{PageInit, PageInitState};

#[tauri::command]
pub fn finished_init_load(page_init_state: tauri::State<PageInitState>) {
    *page_init_state.0.lock() = PageInit::DONE;
}
