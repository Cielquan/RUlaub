#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate tracing;
extern crate tracing_appender;
extern crate tracing_subscriber;

mod db;
use db::models::*;

fn main() {
    let file_appender = tracing_appender::rolling::daily("logs", "log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    tracing_subscriber::fmt()
        .with_writer(non_blocking)
        .pretty()
        .with_ansi(false)
        .with_level(true)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true)
        .with_max_level(tracing::Level::TRACE)
        // .reload_handle(true);
        .init();
    tracing::error!("Test tracing");

    tracing::trace!("App start");

    let conn = db::establish_connection();

    let u = create_new_user();

    let id = u.save_to_db(&conn);

    println!("{}", id.unwrap());
}

fn create_new_user<'a>() -> NewUser<'a> {
    User::new("Name11", &32, &123, None)
}
