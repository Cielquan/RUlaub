#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate tracing;
extern crate tracing_subscriber;

mod db;
use db::models::*;

fn init_tracing() {
    tracing_subscriber::fmt()
        .pretty()
        .with_thread_names(true)
        .with_max_level(tracing::Level::TRACE)
        .init();
}

fn main() {
    init_tracing();

    let conn = db::establish_connection();

    let u = create_new_user();

    let id = u.save_to_db(&conn);

    println!("{}", id.unwrap());
}

fn create_new_user<'a>() -> NewUser<'a> {
    User::new("Name1", &32, &12, None)
}
