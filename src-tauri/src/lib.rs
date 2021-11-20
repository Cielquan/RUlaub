extern crate config as configlib;
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate tracing;

pub mod config;
pub mod db;
pub mod logging;

use directories::ProjectDirs;

pub const NAME: &str = "RUlaub";
pub const AUTHOR: &str = "Cielquan";
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

// NOTE: New line with spacing for tracing messages
pub const NL: &str = "\n    ";

lazy_static! {
    #[derive(Debug)]
    pub static ref PROJECT_DIRS: Option<ProjectDirs> = {
        ProjectDirs::from("", AUTHOR, NAME)
    };
}
