mod file;
pub mod log_level;
pub mod tracer;

use self::file::get_logging_dir_path;
pub use self::log_level::AVAILABLE_LOG_LEVELS;

lazy_static! {
    /// The stringifyed path to the directory where log files are saved.
    ///
    /// Defaults to an empty string on error.
    pub static ref LOGGING_DIR_PATH: String = get_logging_dir_path().unwrap_or_default();
}
