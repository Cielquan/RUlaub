#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

use std::{thread::sleep, time::Duration};

use tauri::{Event, Manager, WindowBuilder};

use rulaub_backend::{logging::logger::start_tracer, menu::get_menu, NAME};

fn main() {
    let (_tracing_handle, _guard) = start_tracer();
    info!("App started.");
    info!("Logging level: TRACE");

    let app = tauri::Builder::default()
        // create window manually b/c of menu
        .create_window(
            "main",
            tauri::WindowUrl::App("index.html".into()),
            move |window_builder, webview_attributes| {
                (
                    window_builder
                        .title(NAME)
                        .menu(get_menu())
                        .inner_size(800.into(), 600.into())
                        .resizable(true)
                        .fullscreen(false)
                        .visible(false),
                    webview_attributes,
                )
            },
        )
        .setup(|app| {
            trace!("Start app setup.");
            let loadingscreen_window = app.get_window("loadingscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

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
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(|_app_handle, event| match event {
        Event::Exit => info!("### App ending."),
        _ => (),
    });

    info!("App ended.");
}
