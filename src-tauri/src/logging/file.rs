use std::io::Write;
use std::{env, fs, path};

use crate::logging;

/// Try to create a logging directory path.
///
/// In the first attempt the [`static@crate::PROJECT_DIRS`] are used as a base.
/// If this fails the current directory will be tried.
pub fn get_logging_dir_path() -> Option<String> {
    trace!(
        target = "tracing",
        message = "Try building logging dir path"
    );
    if let Some(project_dirs) = &*crate::PROJECT_DIRS {
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
        Ok(current_dir) => match current_dir.join(format!("{}_logs", crate::NAME)).to_str() {
            None => {
                error!(
                    target = "tracing",
                    message = "Failed to stringify log dir in current dir; invalid unicode",
                );
                None
            }
            Some(path_str) => Some(String::from(path_str)),
        },
    }
}

/// The threshold of log files to keep in the log directory.
static LOG_FILE_THRESHOLD: usize = 10;

lazy_static! {
    /// The text written to the README file inside the log directory.
    pub static ref LOG_DIR_README_TEXT: String = format!(
        concat!(
            "ATTENTION!!!\n\n",
            "The log files kept in this directory are automatically removed/cleaned up.\n",
            "If the amount of log files exceeds {} files, the 'RUlaub' programm will\n",
            "remove excess files starting from the oldest one, on its next start up.\n"
        ),
        LOG_FILE_THRESHOLD
    );
}

/// Add/Overwrite the README file inside the log directory with [`LOG_DIR_README_TEXT`]
#[tracing::instrument]
pub fn add_log_dir_readme() {
    trace!(
        target = "tracing-cleanup",
        message = "Create log dir README file"
    );

    let file = format!(
        "{}{}{}",
        *logging::LOGGING_DIR_PATH,
        path::MAIN_SEPARATOR,
        "README.txt"
    );
    let path = path::Path::new(&file);

    match fs::File::create(path) {
        Err(err) => {
            error!(
                target = "tracing-cleanup",
                message = "Failed to create/open README file",
                error = ?err
            );
            return;
        }
        Ok(mut file) => {
            trace!(target = "tracing-cleanup", message = "Write to README file");
            if let Err(err) = write!(file, "{}", *LOG_DIR_README_TEXT) {
                error!(
                    target = "tracing-cleanup",
                    message = "Failed to write text to README file",
                    error = ?err
                );
                return;
            }
        }
    }
    trace!(
        target = "tracing-cleanup",
        message = "Successfully created log dir README file"
    );
}

/// Remove log files exceeding the [`LOG_FILE_THRESHOLD`] starting with the oldest one.
#[tracing::instrument]
pub fn clean_log_dir() {
    debug!(
        target = "tracing-cleanup",
        message = "Start log dir clean up routine"
    );

    let pattern = format!(
        "{}{}{}",
        *logging::LOGGING_DIR_PATH,
        path::MAIN_SEPARATOR,
        "log.*"
    );

    trace!(
        target = "tracing-cleanup",
        message = "Get log files in log dir"
    );
    match glob::glob(&pattern) {
        Err(err) => {
            error!(
                target = "tracing-cleanup",
                message = "Failed to load glob pattern",
                pattern = ?pattern,
                error = ?err,
            );
            return;
        }
        Ok(paths_iter) => {
            let path_results: Vec<Result<path::PathBuf, glob::GlobError>> = paths_iter.collect();
            let files_amount = path_results.len();

            if files_amount <= LOG_FILE_THRESHOLD {
                trace!(
                    target = "tracing-cleanup",
                    message = &format!(
                        "Not more than {} log files found; abort clean up",
                        LOG_FILE_THRESHOLD
                    )[..]
                );
                return;
            }

            trace!(
                target = "tracing-cleanup",
                message = "Run clean for log files",
                log_files = ?path_results
            );

            let mut paths: Vec<&path::PathBuf> = path_results
                .iter()
                .filter(|res| !res.is_err())
                .map(move |res| res.as_ref().unwrap())
                .collect();

            if paths.len() != files_amount {
                if paths.len() <= LOG_FILE_THRESHOLD {
                    warn!(
                        target = "tracing-cleanup",
                        message = &format!(
                            concat!(
                                "Some files could not be opend; ",
                                "remaing files are not more then {}; ",
                                "abort clean up"
                            ),
                            LOG_FILE_THRESHOLD
                        )[..],
                        remaining_log_files = ?paths
                    );
                    return;
                }
                warn!(
                    target = "tracing-cleanup",
                    message = &format!(
                        "{} files could not be opend; continue with remaing files",
                        files_amount - paths.len()
                    )[..],
                    remaining_log_files = ?paths
                );
            }

            paths.sort();

            let amount_to_remove = files_amount - LOG_FILE_THRESHOLD;
            for entry in paths.iter().enumerate() {
                if entry.0 >= amount_to_remove {
                    break;
                }
                debug!(
                    target = "tracing-cleanup",
                    message = "Removing old log file",
                    file = ?entry.1.display()
                );
                if let Err(err) = fs::remove_file(entry.1) {
                    error!(
                        target = "tracing-cleanup",
                        message = "Failed to remove old log file",
                        file = ?entry.1.display(),
                        error = ?err
                    );
                }
            }
        }
    }
    debug!(
        target = "tracing-cleanup",
        message = "Finished log dir clean up routine"
    );
}
