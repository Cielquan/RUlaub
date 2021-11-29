use super::{
    file::{
        check_path_is_file, create_config_file_with_defaults, load_config_file, watch_config_file,
    },
    util::{log_config, FileWatchError},
    CONFIG, CONFIG_FILE_PATH,
};

#[tracing::instrument]
pub fn setup_config() {
    trace!("Init config.");
    let _ = &CONFIG;

    trace!("Init config file path");
    let _ = &CONFIG_FILE_PATH;

    log_config();

    trace!("Check if config file exists or needs to be created.");
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

    trace!("Check if config file exists / was created.");
    if check_path_is_file(&CONFIG_FILE_PATH) {
        load_config_file();

        trace!("Spawn task for async file watching.");
        tauri::async_runtime::spawn(async {
            if let Err(err) = watch_config_file().await {
                match err {
                    FileWatchError::WatcherInitError(_) => {
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
        });
    }
}
