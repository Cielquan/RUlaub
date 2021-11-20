use std::env;

use thiserror::Error;

use crate::PROJECT_DIRS;

#[derive(Error, Debug)]
pub enum LoggingDirError {
    #[error("Could not find valid logging dir path.")]
    NoValidPath,
    #[error("Could not stringify logging dir path.")]
    PathStringify,
}

pub fn get_logging_dir_path() -> Result<String, LoggingDirError> {
    if let Some(project_dirs) = &*PROJECT_DIRS {
        if let Some(path) = project_dirs.cache_dir().join("logs").to_str() {
            return Ok(String::from(path));
        }
    }
    if let Ok(pwd) = env::current_dir() {
        match pwd.join("logs").to_str() {
            Some(path) => return Ok(String::from(path)),
            None => return Err(LoggingDirError::PathStringify),
        }
    }
    Err(LoggingDirError::NoValidPath)
}
