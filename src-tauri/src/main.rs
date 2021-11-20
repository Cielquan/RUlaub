#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

use rulaub_backend::logging::logger::start_tracer;
use tauri::Event;

fn main() {
    let (_tracing_handle, _guard) = start_tracer();
    info!("App started.");
    info!("Logging level: TRACE");

    let app = tauri::Builder::default()
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(|_app_handle, event| match event {
        Event::Exit => info!("### App ending."),
        _ => (),
    });

    info!("App ended.");
}
