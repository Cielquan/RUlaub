use tracing_subscriber::{fmt, layer, reload, EnvFilter, Registry};

use crate::logging;

pub type TracerHandle = reload::Handle<
    EnvFilter,
    layer::Layered<
        fmt::Layer<
            Registry,
            fmt::format::DefaultFields,
            fmt::format::Format<fmt::format::Pretty>,
            tracing_appender::non_blocking::NonBlocking,
        >,
        Registry,
    >,
>;

/// Initialize and start a tracing subscriber.
///
/// The returned handle can be used to update the tracing level.
/// If the returned [`WorkerGuard`] is dropped the subsriber will flush the remaining messages
/// and subside.
///
/// # Panics
/// If the logging directory path [`logging::LOGGING_DIR_PATH`] is an empty string.
#[tracing::instrument]
pub fn setup_tracer() -> (TracerHandle, tracing_appender::non_blocking::WorkerGuard) {
    debug!(target = "tracing", message = "Setup tracer");

    trace!(target = "tracing", message = "Init logging dir path");
    let logging_dir_path = logging::LOGGING_DIR_PATH.as_str();
    trace!(
        target = "tracing",
        message = "Use logging dir path",
        path = logging_dir_path
    );

    if logging_dir_path == String::default().as_str() {
        let msg = "Invalid logging dir path";
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
        .fmt_fields(tracing_subscriber::fmt::format::DefaultFields::new())
        .with_level(true)
        .with_target(true)
        .with_thread_names(true)
        .with_thread_ids(true)
        .with_span_events(tracing_subscriber::fmt::format::FmtSpan::FULL)
        // .with_max_level(Level::TRACE)
        .with_env_filter(logging::log_level::create_env_filter("TRACE"))
        .with_filter_reloading();
    let handle = tracer.reload_handle();

    trace!(target = "tracing", message = "Init tracer");
    tracer.init();
    trace!(target = "tracing", message = "Running tracer");
    info!(target = "tracing", message = "Tracing level: TRACE");

    logging::file::add_log_dir_readme();

    logging::file::clean_log_dir();

    (handle, guard)
}

/// Reload the tracing level to the given one.
pub fn reload_tracing_level(handle: &TracerHandle, level: &str) {
    debug!(
        target = "tracing",
        message = "Reload tracing level",
        level = level
    );
    match handle.reload(logging::log_level::create_env_filter(level)) {
        Ok(_) => info!(
            target = "tracing",
            message = "Changed tracing level",
            level = level
        ),
        Err(err) => error!(
            target = "tracing",
            message = "Failed to reload tracing level",
            error = ?err
        ),
    };
}
