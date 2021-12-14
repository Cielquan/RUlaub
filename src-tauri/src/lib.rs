#[macro_use]
extern crate diesel;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate tracing;

pub mod commands;
pub mod config;
mod db;
mod file_watcher;
pub mod logging;
pub mod menu;
pub mod state;

use directories::ProjectDirs;

pub const NAME: &str = "RUlaub";
pub const AUTHOR: &str = "Cielquan";
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

lazy_static! {
    /// Project directories for the RUlaub application to use.
    #[derive(Debug)]
    pub static ref PROJECT_DIRS: Option<ProjectDirs> = ProjectDirs::from("", AUTHOR, NAME);
}
