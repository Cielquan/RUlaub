//! Commands to log messages from the frontend via the app's tracer

#[tauri::command]
pub fn log_error(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    error!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub fn log_warn(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    warn!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub fn log_info(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    info!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub fn log_debug(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    debug!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub fn log_trace(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    trace!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}
