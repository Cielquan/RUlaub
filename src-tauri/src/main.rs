#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

#[macro_use]
extern crate rulaub_backend;

use std::collections::HashMap;
use std::sync::Arc;
use std::thread::sleep;
use std::time::Duration;

use parking_lot::Mutex;
use tauri::{Event, Manager, WindowBuilder};

use rulaub_backend::commands::init::finished_init_load;
use rulaub_backend::commands::logging::{log_debug, log_error, log_info, log_trace, log_warn};
use rulaub_backend::commands::state::{
    get_config_state, get_public_holidays_state, get_school_holidays_state, get_user_row_map_state,
    get_users_state, get_vacation_types_state, set_config_state, set_public_holidays_state,
    set_school_holidays_state, set_user_row_map_state, set_users_state, set_vacation_types_state,
};
use rulaub_backend::config::setup::{setup_config, ConfigSetupErr};
use rulaub_backend::config::DEFAULT_CONFIG;
use rulaub_backend::logging::tracer::setup_tracer;
use rulaub_backend::menu::get_menu;
use rulaub_backend::state::status_states::PageInit;
use rulaub_backend::state::{
    ConfigSetupErrState, ConfigState, PageInitState, PublicHolidaysState, SchoolHolidaysState,
    UserRowMapState, UsersState, VacationTypesState,
};
use rulaub_backend::NAME;

fn main() {
    let (tracing_level_reloader_, _guard) = setup_tracer();
    let reloader = Arc::new(tracing_level_reloader_);
    info!(target = "main", message = "Main started.");

    debug!(target = "tauri_setup", message = "Build tauri app");
    let reloader_ = reloader.clone();
    let app = tauri::Builder::default()
        .create_window(
            // NOTE: create window manually because of window specific menu
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
        .manage(ConfigSetupErrState(Mutex::new(ConfigSetupErr::None)))
        .manage(ConfigState(Mutex::new(DEFAULT_CONFIG.clone())))
        .manage(PageInitState(Mutex::new(PageInit::LOADING)))
        .manage(PublicHolidaysState(Mutex::new(HashMap::new())))
        .manage(SchoolHolidaysState(Mutex::new(HashMap::new())))
        .manage(UserRowMapState(Mutex::new(HashMap::new())))
        .manage(UsersState(Mutex::new(HashMap::new())))
        .manage(VacationTypesState(Mutex::new(HashMap::new())))
        .setup(move |app| {
            debug!(target = "tauri_setup", message = "Start app setup");
            let loadingscreen_window = app.get_window("loadingscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            debug!(target = "tauri_setup", message = "Setup config");
            match setup_config() {
                Ok(conf) => {
                    debug!(
                        target = "tauri_setup",
                        message = "Update config state from file"
                    );
                    let config_state = app.state::<ConfigState>();
                    *config_state.0.lock() = conf;

                    let log_level = &config_state.0.lock().settings.log_level;
                    trace!(
                        target = "tracing",
                        message = "Reload tracer with level from config file",
                        level = ?log_level
                    );
                    reloader_(log_level);
                }
                Err(err) => {
                    let setup_config_err_state = app.state::<ConfigSetupErrState>();
                    *setup_config_err_state.0.lock() = err;
                }
            }

            trace!(target = "tauri_setup", message = "Spawn task for app init");
            let app_handle = app.handle();
            let main_window_ = main_window.clone();
            tauri::async_runtime::spawn(async move {
                debug!(target = "tauri_setup", message = "Start app init");

                debug!(target = "tauri_setup", message = "Finish app init");

                let page_init_state = app_handle.state::<PageInitState>();
                let sleep_time = Duration::from_millis(1000);
                loop {
                    if *page_init_state.0.lock() == PageInit::DONE {
                        break;
                    };
                    debug!(
                        target = "tauri_setup",
                        message = "Waiting for page init load to finish"
                    );
                    sleep(sleep_time);
                }

                debug!(target = "tauri_setup", message = "Close loading screen");
                loadingscreen_window.close().unwrap();
                debug!(target = "tauri_setup", message = "Show main window");
                main_window_.show().unwrap();

                trace!(
                    target = "tauri_setup",
                    message = "Emit config setup error event if any"
                );
                let setup_config_err_state = app_handle.state::<ConfigSetupErrState>();
                match *setup_config_err_state.0.lock() {
                    ConfigSetupErr::None => {}
                    ConfigSetupErr::WriteErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'error-config-file-init-write'"
                        );
                        main_window_
                            .emit("error-config-file-init-write", {})
                            .unwrap();
                    }
                    ConfigSetupErr::ReadErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'error-config-file-init-read'"
                        );
                        main_window_
                            .emit("error-config-file-init-read", {})
                            .unwrap();
                    }
                    ConfigSetupErr::NoFileErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'error-config-file-init-none'"
                        );
                        main_window_
                            .emit("error-config-file-init-none", {})
                            .unwrap();
                    }
                };
            });

            trace!(
                target = "tauri_setup",
                message = "Setup menu event listeners"
            );
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

            debug!(target = "tauri_setup", message = "Finished app setup");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            finished_init_load,
            //
            log_debug,
            log_error,
            log_info,
            log_trace,
            log_warn,
            //
            get_config_state,
            set_config_state,
            //
            get_public_holidays_state,
            set_public_holidays_state,
            //
            get_school_holidays_state,
            set_school_holidays_state,
            //
            get_user_row_map_state,
            set_user_row_map_state,
            //
            get_users_state,
            set_users_state,
            //
            get_vacation_types_state,
            set_vacation_types_state
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    debug!(target = "tauri_setup", message = "Run tauri app");
    app.run(|_app_handle, event| match event {
        Event::Ready => info!(target = "app", message = "App running"),
        Event::Exit => info!(target = "app", message = "App ending"),
        _ => (),
    });

    info!(target = "main", message = "Main ended");
}
