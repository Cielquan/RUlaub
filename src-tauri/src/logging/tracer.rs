use tracing_appender::non_blocking::{NonBlocking, WorkerGuard};
use tracing_subscriber::{
    fmt::{
        format::{DefaultFields, FmtSpan, Format, Pretty},
        Layer,
    },
    layer::Layered,
    reload::Handle,
    EnvFilter, Registry,
};

use super::{util::create_env_filter, LOGGING_DIR_PATH};

pub type TracerHandle = Handle<
    EnvFilter,
    Layered<Layer<Registry, DefaultFields, Format<Pretty>, NonBlocking>, Registry>,
>;

/// Initialize and start a tracing subscriber.
///
/// The returned handle can be used to update the tracing level.
/// If the returned [`WorkerGuard`] is dropped the subsriber will flush the remaining messages
/// and subside.
///
/// # Panics
/// If the logging directory path [`LOGGING_DIR_PATH`] is an empty string.
fn start_tracer() -> (TracerHandle, WorkerGuard) {
    trace!(target = "tracing", "Setup tracer.");

    trace!(target = "tracing", "Init logging dir path.");
    let logging_dir_path = LOGGING_DIR_PATH.as_str();
    trace!(
        target = "tracing",
        message = "Use logging dir path.",
        path = logging_dir_path
    );

    if logging_dir_path == String::default().as_str() {
        let msg = "Invalid logging dir path.";
        error!(target = "tracing", message = msg, path = logging_dir_path);
        panic!("{}", msg);
    }

    let file_appender = tracing_appender::rolling::daily(logging_dir_path, "log");
    let (non_blocking, guard) = tracing_appender::non_blocking(file_appender);
    let tracer = tracing_subscriber::fmt()
        .with_writer(non_blocking)
        .pretty()
        .with_ansi(false)
        // https://github.com/tokio-rs/tracing/issues/1310
        .fmt_fields(DefaultFields::new())
        .with_level(true)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true)
        .with_span_events(FmtSpan::FULL)
        // .with_max_level(Level::TRACE)
        .with_env_filter(create_env_filter("TRACE"))
        .with_filter_reloading();
    let handle = tracer.reload_handle();

    trace!(target = "tracing", "Init tracer.");
    tracer.init();
    trace!(target = "tracing", "Running tracer.");
    info!(target = "tracing", "Tracing level: TRACE");

    (handle, guard)
}

/// Create a function which reloads the tracing level to the given one.
fn create_tracing_level_reloader(handle: TracerHandle) -> impl Fn(&str) {
    trace!(target = "tracing", "Create reloader closure.");
    move |level| {
        trace!(
            target = "tracing",
            message = "Reload tracing level.",
            level = level
        );
        match handle.reload(create_env_filter(level)) {
            Ok(_) => info!(
                target = "tracing",
                message = "Changed tracing level.",
                level = level
            ),
            Err(err) => error!(
                target = "tracing",
                message = "Failed to reload tracing level",
                error = ?err
            ),
        };
    }
}

#[tracing::instrument]
pub fn setup_tracer() -> (impl Fn(&str), WorkerGuard) {
    let (handle, guard) = start_tracer();
    let reloader = create_tracing_level_reloader(handle);
    (reloader, guard)
}
