mod file;

pub mod utils;

use parking_lot::RwLock;

use self::{
    file::{
        check_path_is_file, create_config_file_with_defaults, get_conf_file_path,
        load_config_file, watch_config_file,
    },
    utils::{log_config, FileWatchError},
};

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    name: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Settings {
    database_uri: Option<String>,
    language: String,
    log_level: String,
    theme: String,
    today_autoscroll_left_offset: i32,
    year_change_scroll_begin: bool,
    year_to_show: Option<i32>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
    user: Option<User>,
    settings: Settings,
}

// NOTE: Change defaults also in frontend initial State
pub const DEFAULT_CONFIG_TOML_STR: &str = r#"
settings.language = "de-DE"
settings.log_level = "INFO"
settings.theme = "dark"
settings.today_autoscroll_left_offset = 2
settings.year_change_scroll_begin = true
"#;

pub fn create_default_config() -> configlib::Config {
    trace!("Create default config.");
    let conf_vars = DEFAULT_CONFIG_TOML_STR
        .split('\n')
        .filter(|s| s != &"")
        .map(|s| s.split(" = ").collect::<Vec<&str>>());
    let mut config = configlib::Config::default();
    for c in conf_vars {
        config.set(c[0], c[1]).unwrap();
    }
    config
}

// NOTE: `unwrap` shall never trigger as the string above is always the same
lazy_static! {
    pub static ref DEFAULT_CONFIG_TOML_NICE_STR: String =
        toml::to_string::<Config>(&toml::from_str(DEFAULT_CONFIG_TOML_STR).unwrap())
        .unwrap();

    pub static ref CONFIG_FILE_PATH: String = get_conf_file_path().unwrap_or_default();

    #[derive(Debug)]
    pub static ref CONFIG: RwLock<configlib::Config> =
        RwLock::new(create_default_config());
}

#[tracing::instrument]
pub fn load_and_watch_config_file() {
    log_config();

    if !check_path_is_file(&CONFIG_FILE_PATH) {
        if let Err(err) = create_config_file_with_defaults() {
            error!(
                message = "Failed to create new config file with default config.",
                error = ?err
            );
            // TODO:#i# send err msg to frontend saying config could not be created
            // and prog will run on default conf
        }
    }

    if check_path_is_file(&CONFIG_FILE_PATH) {
        load_config_file();

        if let Err(err) = watch_config_file() {
            match err {
                FileWatchError::WatcherInitError(err) => {
                    // TODO:#i# send err msg to frontend saying config file not watched
                    error!(
                        message = "Failed to initialize config file watcher.",
                        error = ?err
                    );
                }
                _ => {
                    // TODO:#i# send err msg to frontend with force close
                    error!("Failed to update config. Config watcher is broken.");
                }
            }
        }
    }
}
