use std::io::Write;
use std::{fs, path};

use crate::config;

/// Try to create a configuration file path.
///
/// The [`static@crate::PROJECT_DIRS`] are used as a base.
pub fn get_conf_file_path() -> Option<String> {
    trace!(target = "config", message = "Build conf file path");
    match &*crate::PROJECT_DIRS {
        None => {
            error!(
                taregt = "config",
                message = "Could not find project directories for this OS"
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
        file_path = ?(*config::CONFIG_FILE_PATH),
        content = ?content
    );
    let path = path::Path::new(&*config::CONFIG_FILE_PATH);
    if let Some(parent) = path.parent() {
        trace!(target = "config", message = "Create parent dirs if missing");
        if let Err(err) = fs::create_dir_all(parent) {
            error!(target = "config", message = "Failed to create parent dirs", error = ?err);
            return Err(err.into());
        }
    }
    trace!(
        target = "config",
        message = "Create file if missing and open"
    );
    match fs::File::create(path) {
        Err(err) => {
            error!(target = "config", message = "Failed to create/open config file", error = ?err);
            return Err(err.into());
        }
        Ok(mut file) => {
            trace!(target = "config", message = "Write to file");
            if let Err(err) = write!(file, "{}", content) {
                error!(
                    target = "config",
                    message = "Failed to write config to file",
                    error = ?err
                );
                return Err(err.into());
            }
        }
    }
    Ok(())
}

/// Load and parse the content of the configuration file.
pub fn load_config_file() -> anyhow::Result<config::Config> {
    debug!(target = "config", message = "Load config file");

    match fs::read_to_string(&*config::CONFIG_FILE_PATH) {
        Ok(conf) => config::parser::parse_toml_str_to_config(&conf),
        Err(err) => {
            error!(
                target = "config",
                message = "Failed to read config file into string",
                error = ?err
            );
            Err(err.into())
        }
    }
}
