#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

use tauri::{Event, Manager, WindowBuilder};

use rulaub_backend::{
    config::setup::setup_config, logging::tracer::start_tracer, menu::get_menu, NAME,
};

fn main() {
    let (_tracing_handle, _guard) = start_tracer();
    info!(target = "main", "Main started.");
    info!(target = "tracing", "Tracing level: TRACE");

    trace!(target = "tauri_setup", "Build tauri app.");
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
            trace!(target = "tauri_setup", "Start app setup.");
            let loadingscreen_window = app.get_window("loadingscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            trace!(target = "tauri_setup", "Spawn task for app init.");
            let main_window_ = main_window.clone();
            tauri::async_runtime::spawn(async move {
                trace!(target = "tauri_setup", "Start app init.");
                setup_config();
                trace!(target = "tauri_setup", "Finish app init.");

                trace!(target = "tauri_setup", "Close loading screen.");
                loadingscreen_window.close().unwrap();
                trace!(target = "tauri_setup", "Show main window.");
                main_window_.show().unwrap();
            });

            trace!(target = "tauri_setup", "Setup menu event listeners.");
            let main_window_ = main_window.clone();
            main_window.on_menu_event(move |event| match event.menu_item_id() {
                "en_lang" => main_window_.emit("menu-clicked-lang-en", {}).unwrap(),
                "de_lang" => main_window_.emit("menu-clicked-lang-de", {}).unwrap(),
                "dark_theme" => main_window_.emit("menu-clicked-theme-dark", {}).unwrap(),
                "light_theme" => main_window_.emit("menu-clicked-theme-light", {}).unwrap(),
                "settings" => main_window_.emit("menu-clicked-settings", {}).unwrap(),
                "about" => main_window_.emit("menu-clicked-about", {}).unwrap(),
                "new_db" => main_window_.emit("menu-clicked-db-new", {}).unwrap(),
                "select_db" => main_window_.emit("menu-clicked-db-select", {}).unwrap(),
                "new_vac" => main_window_.emit("menu-clicked-vac-new", {}).unwrap(),
                "edit_vacs" => main_window_.emit("menu-clicked-vac-edit", {}).unwrap(),
                "users" => main_window_.emit("menu-clicked-users", {}).unwrap(),
                "pub_holidays" => main_window_.emit("menu-clicked-pub_holidays", {}).unwrap(),
                "school_holidays" => main_window_
                    .emit("menu-clicked-school_holidays", {})
                    .unwrap(),
                "vac_types" => main_window_.emit("menu-clicked-vac_types", {}).unwrap(),
                _ => {}
            });

            trace!(target = "tauri_setup", "Finished app setup.");
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    trace!(target = "tauri_setup", "Run tauri app.");
    app.run(|_app_handle, event| match event {
        Event::Ready => info!(target = "app", "App running."),
        Event::Exit => info!(target = "app", "App ending."),
        _ => (),
    });

    info!(target = "main", "Main ended.");
}
