#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

use std::{thread::sleep, time::Duration};

use tauri::{Event, Manager};

use rulaub_backend::{logging::logger::start_tracer, menu::get_menu};

fn main() {
    let (_tracing_handle, _guard) = start_tracer();
    info!("App started.");
    info!("Logging level: TRACE");

    let app = tauri::Builder::default()
        .setup(|app| {
            trace!("Start app setup.");
            let loadingscreen_window = app.get_window("loadingscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            loadingscreen_window.menu_handle().hide().unwrap();

            tauri::async_runtime::spawn(async move {
                trace!("Start app init.");
                sleep(Duration::from_secs(2));
                trace!("Finish app init.");

                loadingscreen_window.close().unwrap();
                main_window.show().unwrap();
            });

            trace!("Finished app setup.");
            Ok(())
        })
        .menu(get_menu())
        .on_menu_event(|event| {
            println!("{:?}", event.menu_item_id());
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(|_app_handle, event| match event {
        Event::Exit => info!("### App ending."),
        _ => (),
    });

    info!("App ended.");
}
