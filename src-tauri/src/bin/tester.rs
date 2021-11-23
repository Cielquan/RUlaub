#[macro_use]
extern crate tracing;

use std::env;

use dotenv::dotenv;

use db::models::*;
use rulaub_backend::{
    db,
    logging::{logger::start_tracer, util::create_env_filter},
};

fn main() {
    let (tracing_handle, _guard) = start_tracer();

    trace!("App started.");
    info!("Logging level: TRACE");

    tracing_handle.reload(create_env_filter("TRACE")).unwrap();

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
