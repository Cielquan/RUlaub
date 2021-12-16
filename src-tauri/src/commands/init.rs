//! Commands used while the programm's init
use crate::state::status_states::PageInit;
use crate::state::PageInitState;

#[tracing::instrument(skip(page_init_state))]
#[tauri::command]
pub fn finished_init_load(page_init_state: tauri::State<PageInitState>) {
    *page_init_state.0.lock() = PageInit::DONE;
}
