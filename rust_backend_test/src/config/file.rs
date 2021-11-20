use std::{
    fs::{create_dir_all, File},
    io::{Error as IOError, Write},
    path::Path,
};

use thiserror::Error;
use tracing::{debug, error, trace};

use super::DEFAULT_CONFIG_TOML_NICE_STR;
use crate::{NL, PROJECT_DIRS};

#[derive(Error, Debug)]
pub enum ConfigFileError {
    #[error("Could not find project dirs.")]
    ProjectDirsNotFound,
    #[error("Could not stringify config file path.")]
    PathStringify,
    #[error("Could not interact with config file.")]
    FileError(#[from] IOError),
}

fn get_conf_file_path() -> Result<String, ConfigFileError> {
    match &*PROJECT_DIRS {
        None => {
            error!("Could not find project directories for this OS.");
            Err(ConfigFileError::ProjectDirsNotFound)
        }
        Some(project_dirs) => {
            match project_dirs.config_dir().join("config.toml").to_str() {
                None => {
                    error!(concat!(
                        "Failed to build conf file path. ",
                        "Could not stringify the path."
                    ));
                    Err(ConfigFileError::PathStringify)
                }
                Some(path) => {
                    trace!("Built conf file path:{}{}>", NL, path);
                    Ok(String::from(path))
                }
            }
        }
    }
}

#[tracing::instrument]
pub fn check_path_is_file(path: &str) -> bool {
    let is_file = Path::new(path).is_file();
    debug!("Path points to file: {}", is_file);
    is_file
}

lazy_static! {
    pub static ref CONFIG_FILE_PATH: String = get_conf_file_path().unwrap_or_default();
}

#[tracing::instrument]
pub fn write_to_config_file(content: &str) -> Result<(), ConfigFileError> {
    trace!("Write to config file.{}Path: {:?}", NL, *CONFIG_FILE_PATH);
    let path = Path::new(&*CONFIG_FILE_PATH);
    trace!("Create parent dirs if missing.");
    if let Some(parent) = path.parent() {
        create_dir_all(parent)?
    }
    trace!("Create file if missing and open.");
    let mut file = File::create(path)?;
    trace!("Write to file.");
    write!(file, "{}", content)?;
    Ok(())
}

pub fn create_config_file_with_defaults() -> Result<(), ConfigFileError> {
    trace!("Create new config file with defaults.");
    write_to_config_file(&DEFAULT_CONFIG_TOML_NICE_STR)?;
    Ok(())
}
