pub mod file;
pub mod logger;
pub mod util;

use self::file::get_logging_dir_path;

lazy_static! {
    pub static ref LOGGING_DIR_PATH: String = get_logging_dir_path().unwrap_or_default();
}
