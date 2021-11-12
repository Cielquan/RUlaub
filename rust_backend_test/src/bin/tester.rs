extern crate anyhow;
// #[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate tracing;
extern crate tracing_appender;
extern crate tracing_subscriber;

extern crate rulaub_backend;

use std::env;

use dotenv::dotenv;
use tracing::{info, trace};

use db::models::*;
use rulaub_backend::{
    db,
    logging::{file::get_logging_dir_path, util::create_env_filter},
};

fn main() {
    let log_dir = get_logging_dir_path().unwrap();
    let file_appender = tracing_appender::rolling::daily(log_dir, "log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    let tracer = tracing_subscriber::fmt()
        .with_writer(non_blocking)
        .pretty()
        .with_ansi(false)
        // https://github.com/tokio-rs/tracing/issues/1310
        .fmt_fields(tracing_subscriber::fmt::format::DefaultFields::new())
        .with_level(true)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true)
        // .with_max_level(Level::TRACE)
        .with_env_filter(create_env_filter("TRACE"))
        .with_filter_reloading();
    let handle = tracer.reload_handle();
    tracer.init();

    trace!("App started.");
    info!("Logging level: TRACE");

    rulaub_backend::config::loader::load_and_watch_config_file();

    handle.reload(create_env_filter("TRACE")).unwrap();

    // let id = create_new_user();
    // println!("{}", id.unwrap());

    println!("App end");
    trace!("App end");
}

#[allow(clippy::all, dead_code)]
fn get_db_url() -> String {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    database_url
}

#[allow(clippy::all, dead_code)]
fn create_new_user() -> anyhow::Result<i32> {
    let add = 0; // CHANGE ME

    let db_url = get_db_url();
    let conn = db::establish_connection_to(&db_url[..]);

    let num = 1 + add;
    let name = format!("Name{}", &num);
    User::new(
        &name, &32, &true, &true, &true, &true, &true, &false, &false,
    )
    .save_to_db(&conn)
}
