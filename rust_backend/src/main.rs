#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate tracing;
extern crate tracing_appender;
extern crate tracing_subscriber;

mod db;
use db::models::*;

use tracing::Level;

fn main() {
    let file_appender = tracing_appender::rolling::daily("logs", "log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    let tracer = tracing_subscriber::fmt()
        .with_writer(non_blocking)
        .pretty()
        .with_ansi(false)
        .with_level(true)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true)
        .with_max_level(Level::INFO);
    // .with_filter_reloading()
    // let handle = tracer.reload_handle();
    tracer.init();
    tracing::debug!("Test tracing1");
    // handle.reload(Level::DEBUG).expect("the collector should still exist");
    tracing::debug!("Test tracing2");

    tracing::trace!("App start");

    let conn = db::establish_connection();

    let u = create_new_user();

    let id = u.save_to_db(&conn);

    println!("{}", id.unwrap());
}

fn create_new_user<'a>() -> NewUser<'a> {
    User::new("Name11", &32, &123, None)
}
