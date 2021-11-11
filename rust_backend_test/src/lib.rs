extern crate anyhow;
extern crate config as configlib;
#[macro_use]
extern crate diesel;
extern crate directories;
extern crate dotenv;
#[macro_use]
extern crate lazy_static;
extern crate notify;
extern crate thiserror;
extern crate tracing;

pub mod config;
pub mod db;
pub mod logging;

use directories::ProjectDirs;

pub const NAME: &str = "RUlaub";
pub const AUTHOR: &str = "Cielquan";
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

lazy_static! {
    #[derive(Debug)]
    pub static ref PROJECT_DIRS: Option<ProjectDirs> = ProjectDirs::from("", AUTHOR, NAME);
}
