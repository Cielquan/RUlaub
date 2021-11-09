extern crate anyhow;
// #[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate tracing;
extern crate tracing_appender;
extern crate tracing_subscriber;

extern crate rulaub_backend;

use dotenv::dotenv;
use std::env;
use tracing::Level;

use db::models::*;
use rulaub_backend::db;

fn main() {
    let file_appender = tracing_appender::rolling::daily("logs", "log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    let tracer = tracing_subscriber::fmt()
        .with_writer(non_blocking)
        .pretty()
        .with_ansi(false)
        // https://github.com/tokio-rs/tracing/issues/1310
        .fmt_fields(tracing_subscriber::fmt::format::DefaultFields::new())
        .with_level(true)
        .with_max_level(Level::TRACE)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true);
    // .with_filter_reloading()
    // let handle = tracer.reload_handle();
    tracer.init();
    tracing::debug!("Test tracing1");
    // handle.reload(Level::DEBUG).expect("the collector should still exist");
    tracing::debug!("Test tracing2");

    tracing::trace!("App start");
    println!("App start");

    println!(
        "File path: {:?}",
        *rulaub_backend::config::loader::SETTINGS_FILE_PATH_STR // rulaub_backend::config::get_conf_file_path()
    );

    rulaub_backend::config::loader::watch_settings_file();

    // let id = create_new_user();
    // println!("{}", id.unwrap());

    println!("App end");
    tracing::trace!("App end");
}

fn get_db_url() -> String {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    database_url
}

fn create_new_user<'a>() -> anyhow::Result<i32> {
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
