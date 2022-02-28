//! Commands to log messages from the frontend via the app's tracer

#[tauri::command]
pub async fn log_error(
    target: String,
    message: String,
    location: String,
    err_object_string: Option<String>,
) {
    let frontend_target = format!("frontend__{}", target);

    let err = if let Some(err_msg) = err_object_string {
        err_msg
    } else {
        String::from("None given")
    };

    error!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..],
        error = &err[..],
    );
}

#[tauri::command]
pub async fn log_warn(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    warn!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub async fn log_info(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    info!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub async fn log_debug(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    debug!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}

#[tauri::command]
pub async fn log_trace(target: String, message: String, location: String) {
    let frontend_target = format!("frontend__{}", target);
    trace!(
        target = &frontend_target[..],
        message = &message[..],
        frontend_location = &location[..]
    );
}
