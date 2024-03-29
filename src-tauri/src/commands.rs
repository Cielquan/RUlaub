pub mod config;
pub mod database;
pub mod init;
pub mod logging;

pub type CommandResult<T> = Result<T, String>;
