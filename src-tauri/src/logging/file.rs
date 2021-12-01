use std::env;

use crate::PROJECT_DIRS;

/// Try to create a logging directory path.
///
/// In the first attempt the [`static@crate::PROJECT_DIRS`] are used as a base.
/// If this fails the current directory will be tried.
pub fn get_logging_dir_path() -> Option<String> {
    trace!(
        target = "tracing",
        message = "Try building logging dir path"
    );
    if let Some(project_dirs) = &*PROJECT_DIRS {
        if let Some(path) = project_dirs.cache_dir().join("logs").to_str() {
            return Some(String::from(path));
        }
    }
    debug!(
        target = "tracing",
        message = "Could not build logging dir path; try using current dir"
    );
    match env::current_dir() {
        Err(err) => {
            error!(
                target = "tracing",
                message = "Failed to get current dir",
                error = ?err
            );
            None
        }
        Ok(current_dir) => Some(String::from(current_dir.join("logs").to_str()?)),
    }
}
