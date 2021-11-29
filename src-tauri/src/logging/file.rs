use std::env;

use crate::PROJECT_DIRS;

pub fn get_logging_dir_path() -> Option<String> {
    trace!(target = "tracing", "Try building logging dir path.");
    if let Some(project_dirs) = &*PROJECT_DIRS {
        if let Some(path) = project_dirs.cache_dir().join("logs").to_str() {
            return Some(String::from(path));
        }
    }
    debug!(
        target = "tracing",
        "Could not build logging dir path. Try using current dir."
    );
    match env::current_dir() {
        Err(err) => {
            error!(
                target = "tracing",
                message = "Failed to get current dir.",
                error = ?err
            );
            None
        }
        Ok(current_dir) => Some(String::from(current_dir.join("logs").to_str()?)),
    }
}
