use std::collections::HashMap;
use std::io::{Error as IOError, ErrorKind as IOErrorKind};
use std::path::{Path, PathBuf};
use std::sync::mpsc::channel;
use std::sync::RwLock;
use std::time::Duration;

use configlib::*;
use directories::ProjectDirs;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};

fn build_conf_file_path() -> Option<PathBuf> {
    Some(
        ProjectDirs::from("", crate::AUTHOR, crate::NAME)?
            .config_dir()
            .join("settings.toml"),
    )
}

fn get_conf_file_path() -> Result<PathBuf, IOError> {
    match build_conf_file_path() {
        Some(path) => Ok(path),
        None => Err(IOError::new(
            IOErrorKind::NotFound,
            "Could not build config file path.",
        )),
    }
}

fn check_conf_file_path() -> PathBuf {
    get_conf_file_path().expect(concat!(
        "Potential issue with the filesystem.",
        "Could not find project direcotries for this OS."
    ))
}

lazy_static! {
    static ref SETTINGS_FILE_PATH: PathBuf = {
        check_conf_file_path()
    };
    static ref SETTINGS_FILE_FOUND: bool = {
        if let Ok(path) = get_conf_file_path() {
            return Path::new(&path).is_file()
        }
        false
    };
    pub static ref SETTINGS: RwLock<Config> = RwLock::new({
        let mut settings = Config::default();
        if *SETTINGS_FILE_FOUND {
            if let Ok(path) = get_conf_file_path() {
                settings.merge(File::with_name(path)).unwrap();
            }
        }
        settings
    });
}

fn show() {
    println!(
        " * Settings :: \n\x1b[31m{:?}\x1b[0m",
        SETTINGS
            .read()
            .unwrap()
            .clone()
            .try_into::<HashMap<String, String>>()
            .unwrap()
    );
}

fn watch() {
    // Create a channel to receive the events.
    let (tx, rx) = channel();

    // Automatically select the best implementation for your platform.
    // You can also access each implementation directly e.g. INotifyWatcher.
    let mut watcher: RecommendedWatcher =
        Watcher::new(tx, Duration::from_secs(2)).unwrap();

    // Add a path to be watched. All files and directories at that path and
    // below will be monitored for changes.
    watcher
        .watch(get_conf_file_path(), RecursiveMode::NonRecursive)
        .unwrap();

    // This is a simple loop, but you may want to use more complex logic here,
    // for example to handle I/O.
    loop {
        match rx.recv() {
            Ok(DebouncedEvent::Write(_)) => {
                println!(" * Settings.toml written; refreshing configuration ...");
                SETTINGS.write().unwrap().refresh().unwrap();
                show();
            }

            Err(e) => println!("watch error: {:?}", e),

            _ => {
                // Ignore event
            }
        }
    }
}

pub fn watch_settings() {
    show();
    watch();
}
