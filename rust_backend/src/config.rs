use configlib::*;
use directories::ProjectDirs;
use notify::{DebouncedEvent, RecommendedWatcher, RecursiveMode, Watcher};

use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::mpsc::channel;
use std::sync::RwLock;
use std::time::Duration;

fn get_conf_file_path() -> Option<String> {
    let proj_dirs = ProjectDirs::from("", crate::AUTHOR, crate::NAME)?;
    let conf_dir_path = PathBuf::from(proj_dirs.config_dir());
    let conf_dir_path_str = conf_dir_path.to_str()?;
    let conf_file = Path::new(conf_dir_path_str).join("settings.toml");
    Some(String::from(conf_file.to_str()?))
}

pub fn get_conf_file_path_str() -> String {
    match get_conf_file_path() {
        Some(s) => s,
        None => panic!("No conf file string"),
    }
}

lazy_static! {
    static ref SETTINGS: RwLock<Config> = RwLock::new({
        let mut settings = Config::default();
        settings
            .merge(File::with_name(&get_conf_file_path_str()[..]))
            .unwrap();

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
        .watch(get_conf_file_path_str(), RecursiveMode::NonRecursive)
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
    // This is just an example of what could be done, today
    // We do want this to be built-in to config-rs at some point
    // Feel free to take a crack at a PR

    show();
    watch();
}
