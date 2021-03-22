extern crate anyhow;
extern crate config as configlib;
#[macro_use]
extern crate diesel;
extern crate directories;
extern crate dotenv;
// #[macro_use]
extern crate lazy_static;
extern crate notify;
extern crate thiserror;
extern crate tracing;

mod config;

pub mod db;

pub const NAME: &'static str = "RUlaub";
pub const AUTHOR: &'static str = "Cielquan";
pub const VERSION: &'static str = env!("CARGO_PKG_VERSION");
