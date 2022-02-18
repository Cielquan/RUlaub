//! Commands used while the programm's init
use super::CommandResult;
use crate::state;

#[tracing::instrument(skip(page_init_state))]
#[tauri::command]
pub async fn finished_init_load(
    page_init_state: tauri::State<'_, state::PageInitState>,
) -> CommandResult<()> {
    *page_init_state.0.lock() = state::PageInit::DONE;
    Ok(())
}

#[tracing::instrument(skip(page_init_state))]
#[tauri::command]
pub async fn aborted_init_load(
    page_init_state: tauri::State<'_, state::PageInitState>,
) -> CommandResult<()> {
    *page_init_state.0.lock() = state::PageInit::ABORTED;
    Ok(())
}
