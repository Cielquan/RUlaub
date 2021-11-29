use std::{
    fs::{create_dir_all, File},
    io::Write,
    path::Path,
};

use configlib::File as ConfigFile;
use notify::{Event, EventKind, RecursiveMode, Watcher};

use super::{
    util::{create_default_config, log_config},
    CONFIG, CONFIG_FILE_PATH,
};
use crate::{util::async_util::create_async_watcher, PROJECT_DIRS};

pub fn get_conf_file_path() -> Option<String> {
    trace!(target = "config", "Build conf file path.");
    match &*PROJECT_DIRS {
        None => {
            error!(
                taregt = "config",
                "Could not find project directories for this OS."
            );
            None
        }
        Some(project_dirs) => match project_dirs.config_dir().join("config.toml").to_str() {
            None => {
                error!(
                    taregt = "config",
                    "Failed to build conf file path. Could not stringify the path."
                );
                None
            }
            Some(path) => {
                trace!(taregt="config", message="Built conf file path.", path=?path);
                Some(String::from(path))
            }
        },
    }
}

pub fn write_to_config_file(content: &str) -> anyhow::Result<()> {
    trace!(
        target = "config",
        message = "Write to config file.",
        file_path = ?(*CONFIG_FILE_PATH),
        content = ?content
    );
    let path = Path::new(&*CONFIG_FILE_PATH);
    trace!(target = "config", "Create parent dirs if missing.");
    if let Some(parent) = path.parent() {
        create_dir_all(parent)?
    }
    trace!(target = "config", "Create file if missing and open.");
    let mut file = File::create(path)?;
    trace!(target = "config", "Write to file.");
    write!(file, "{}", content)?;
    Ok(())
}

pub fn load_config_file() {
    trace!(target = "config", "Load config file.");
    {
        let mut config_guard = CONFIG.write();
        if let Err(err) = config_guard.merge(ConfigFile::with_name(&CONFIG_FILE_PATH)) {
            error!(
                target = "config",
                message = concat!(
                    "Failed to merge config file into config struct. ",
                    "Settings config struct back to default config."
                ),
                error = ?err
            );
            // TODO:#i# send msg to err frontend saying to fix config and restart
            *config_guard = create_default_config();
        };
    }
    log_config();
}

#[tracing::instrument]
pub async fn watch_config_file() -> anyhow::Result<()> {
    let (mut watcher, mut rx) = create_async_watcher()?;

    trace!(target = "config", "Start config file watcher.");
    if let Err(err) = watcher.watch(
        Path::new(&CONFIG_FILE_PATH[..]),
        RecursiveMode::NonRecursive,
    ) {
        error!(
            target = "config",
            message = "Failed to initialize config file watcher.",
            error = ?err
        );
        return Err(err.into());
    };

    trace!(target = "config", "Start watching config file.");
    while let Some(res) = rx.recv().await {
        match res {
            Ok(Event {
                kind: EventKind::Modify(_),
                ..
            }) => {
                info!(
                    target = "config",
                    "config.toml updated. Refreshing configuration."
                );
                let mut config_guard = CONFIG.write();
                if let Err(err) = config_guard.refresh() {
                    error!(
                        target = "config",
                        message = concat!(
                            "Failed to update config. Probably invalid config file content."
                        ),
                        error = ?err
                    );
                }
                log_config();
            }
            Err(err) => error!(
                target = "config",
                message = "Error while watching config file.",
                err = ?err
            ),
            _ => { /* Ignore other event */ }
        }
    }
    Ok(())
}
