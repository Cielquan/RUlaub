use std::fs::{self, create_dir_all, File};
use std::io::Write;
use std::path::Path;

use super::{Config, CONFIG_FILE_PATH};
use crate::config::util::parse_toml_str_to_config;
use crate::PROJECT_DIRS;

/// Try to create a configuration file path.
///
/// The [`static@crate::PROJECT_DIRS`] are used as a base.
pub fn get_conf_file_path() -> Option<String> {
    trace!(target = "config", "Build conf file path");
    match &*PROJECT_DIRS {
        None => {
            error!(
                taregt = "config",
                "Could not find project directories for this OS"
            );
            None
        }
        Some(project_dirs) => match project_dirs.config_dir().join("config.toml").to_str() {
            None => {
                error!(
                    taregt = "config",
                    "Failed to build conf file path; could not stringify the path"
                );
                None
            }
            Some(path) => {
                trace!(taregt = "config", message = "Built conf file path", path = ?path);
                Some(String::from(path))
            }
        },
    }
}

/// Write the given content to the configuration file.
pub fn write_to_config_file(content: &str) -> anyhow::Result<()> {
    debug!(
        target = "config",
        message = "Write to config file",
        file_path = ?(*CONFIG_FILE_PATH),
        content = ?content
    );
    let path = Path::new(&*CONFIG_FILE_PATH);
    trace!(target = "config", "Create parent dirs if missing");
    if let Some(parent) = path.parent() {
        create_dir_all(parent)?
    }
    trace!(target = "config", "Create file if missing and open");
    let mut file = File::create(path)?;
    trace!(target = "config", "Write to file");
    write!(file, "{}", content)?;
    Ok(())
}

/// Load and parse the content of the configuration file.
pub fn load_config_file() -> anyhow::Result<Config> {
    debug!(target = "config", "Load config file");

    match fs::read_to_string(&*CONFIG_FILE_PATH) {
        Ok(conf) => parse_toml_str_to_config(&conf),
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to read config file into string",
                error = ?err
            );
            return Err(err.into());
        }
    }
}
