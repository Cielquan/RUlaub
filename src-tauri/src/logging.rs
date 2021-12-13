mod file;
mod level;
pub mod tracer;

use self::file::get_logging_dir_path;

lazy_static! {
    /// The stringifyed path to the directory where log files are saved.
    ///
    /// Defaults to an empty string on error.
    pub static ref LOGGING_DIR_PATH: String = get_logging_dir_path().unwrap_or_default();
}
