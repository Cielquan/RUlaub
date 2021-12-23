//! Commands used while the programm's init
use super::CommandResult;
use crate::state::{PageInit, PageInitState};

#[tracing::instrument(skip(page_init_state))]
#[tauri::command]
pub async fn finished_init_load(
    page_init_state: tauri::State<'_, PageInitState>,
) -> CommandResult<()> {
    *page_init_state.0.lock() = PageInit::DONE;
    Ok(())
}
