#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tracing;

extern crate rulaub_backend;

use std::thread::sleep;
use std::time::Duration;

use parking_lot::Mutex;
use tauri::Manager;

use rulaub_backend::config::types::StringEnum;
use rulaub_backend::{commands, config, db, logging, state};

fn main() {
    let (tracer_handle, _guard) = logging::tracer::setup_tracer();
    info!(target = "main", message = "Main started.");

    debug!(target = "tauri_setup", message = "Build tauri app");
    let app = tauri::Builder::default()
        .manage(state::TracerHandleState(Mutex::new(tracer_handle)))
        .manage(state::ConfigSetupErrState(Mutex::new(
            config::setup::ConfigSetupErr::None,
        )))
        .manage(state::ConfigState(Mutex::new(
            config::DEFAULT_CONFIG.clone(),
        )))
        .manage(state::PageInitState(Mutex::new(state::PageInit::LOADING)))
        .setup(move |app| {
            debug!(target = "tauri_setup", message = "Start app setup");
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            debug!(target = "tauri_setup", message = "Setup config");
            match config::setup::setup_config() {
                Ok(conf) => {
                    debug!(
                        target = "tauri_setup",
                        message = "Update config state from file",
                        config = ?conf
                    );
                    let config_state = app.state::<state::ConfigState>();
                    *config_state.0.lock() = conf;

                    let log_level = &config_state.0.lock().settings.log_level;
                    trace!(
                        target = "tracing",
                        message = "Reload tracer with level from config file",
                        level = ?log_level
                    );
                    let tracer_handle = app.state::<state::TracerHandleState>();
                    logging::tracer::reload_tracing_level(
                        &tracer_handle.0.lock(),
                        &log_level.to_string(),
                    );
                }
                Err(err) => {
                    let setup_config_err_state = app.state::<state::ConfigSetupErrState>();
                    *setup_config_err_state.0.lock() = err;
                }
            }

            {
                debug!(target = "tauri_setup", message = "Check if database is set");
                let config_state = app.state::<state::ConfigState>();
                let database_uri = &config_state.0.lock().settings.database_uri;
                match database_uri {
                    None => info!(
                        target = "tauri_setup",
                        message = "Database not set; skip update"
                    ),
                    Some(db_uri) => {
                        let _ = db::migrate_db_schema(db_uri, true);
                    }
                }
            }

            trace!(target = "tauri_setup", message = "Spawn task for app init");
            let app_handle = app.handle();
            let main_window_ = main_window.clone();
            tauri::async_runtime::spawn(async move {
                debug!(target = "tauri_setup", message = "Start app init");

                let page_init_state = app_handle.state::<state::PageInitState>();
                let sleep_time = Duration::from_millis(1000);
                loop {
                    match *page_init_state.0.lock() {
                        state::PageInit::DONE => break,
                        state::PageInit::ABORTED => {
                            error!(
                                target = "tauri_setup",
                                message = concat!(
                                    "Frontend page init load was aborted. ",
                                    "Error while fetching config."
                                )
                            );
                            app_handle.exit(1);
                        }
                        _ => {}
                    };
                    debug!(
                        target = "tauri_setup",
                        message = "Waiting for page init load to finish"
                    );
                    sleep(sleep_time);
                }

                debug!(
                    target = "tauri_setup",
                    message = "Finish app init; Close splash screen"
                );
                splashscreen_window.close().unwrap();
                debug!(target = "tauri_setup", message = "Show main window");
                main_window_.show().unwrap();

                trace!(
                    target = "tauri_setup",
                    message = "Emit config setup error event if any"
                );
                let setup_config_err_state = app_handle.state::<state::ConfigSetupErrState>();
                match *setup_config_err_state.0.lock() {
                    config::setup::ConfigSetupErr::None => {}
                    config::setup::ConfigSetupErr::WriteErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'config-file-init-write-error'"
                        );
                        main_window_
                            .emit("config-file-init-write-error", ())
                            .unwrap();
                    }
                    config::setup::ConfigSetupErr::ReadErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'config-file-init-read-error'"
                        );
                        main_window_
                            .emit("config-file-init-read-error", ())
                            .unwrap();
                    }
                    config::setup::ConfigSetupErr::NoFileErr => {
                        trace!(
                            target = "emit_event",
                            message = "Emit event 'config-file-init-none-error'"
                        );
                        main_window_
                            .emit("config-file-init-none-error", ())
                            .unwrap();
                    }
                };
            });

            debug!(target = "tauri_setup", message = "Finished app setup");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::init::aborted_init_load,
            commands::init::finished_init_load,
            //
            commands::logging::log_debug,
            commands::logging::log_error,
            commands::logging::log_info,
            commands::logging::log_trace,
            commands::logging::log_warn,
            //
            commands::config::set::set_config_state,
            commands::config::get::get_config_state,
            //
            commands::config::set::set_db_uri,
            commands::config::set::set_today_autoscroll_left_offset,
            commands::config::set::set_user_name,
            commands::config::set::set_year_change_scroll_begin,
            commands::config::set::set_year_to_show,
            //
            commands::config::set::set_langauge,
            commands::config::get::get_available_languages,
            //
            commands::config::set::set_log_level,
            commands::config::get::get_available_log_levels,
            //
            commands::config::set::set_theme,
            //
            commands::config::set::create_db,
            //
            commands::database::set::update_public_holidays,
            commands::database::get::load_public_holidays,
            //
            commands::database::set::update_school_holidays,
            commands::database::get::load_school_holidays,
            //
            commands::database::set::update_school_holidays_link,
            commands::database::get::get_school_holidays_link,
            //
            commands::database::set::update_users,
            commands::database::get::load_users,
            //
            commands::database::set::update_vacations,
            commands::database::get::load_vacations,
            //
            commands::database::get::load_vacation_stats,
            //
            commands::database::set::update_vacation_types,
            commands::database::get::load_vacation_types,
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    debug!(target = "tauri_setup", message = "Run tauri app");
    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => info!(target = "app", message = "App running"),
        tauri::RunEvent::Exit => info!(target = "app", message = "App ending"),
        _ => (),
    });

    info!(target = "main", message = "Main ended");
}
