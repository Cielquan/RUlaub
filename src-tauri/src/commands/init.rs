//! Commands used while the programm's init
use std::thread::sleep;
use std::time::Duration;

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

#[tracing::instrument(skip(db_setup_err_state))]
#[tauri::command]
pub async fn get_db_init_state(
    db_setup_err_state: tauri::State<'_, state::DBSetupState>,
) -> Result<state::DBSetup, state::DBSetup> {
    let sleep_time = Duration::from_millis(1000);
    loop {
        match *db_setup_err_state.0.lock() {
            state::DBSetup::Loading => {
                debug!(
                    target = "tauri_setup",
                    message = "Waiting for db init to finish"
                );
                sleep(sleep_time);
            }
            state::DBSetup::OK => return Ok(state::DBSetup::OK),
            state::DBSetup::NoUriSet => return Ok(state::DBSetup::NoUriSet),
            state::DBSetup::NoFileFound => return Err(state::DBSetup::NoFileFound),
            state::DBSetup::DBError => return Err(state::DBSetup::DBError),
        };
    }
}
