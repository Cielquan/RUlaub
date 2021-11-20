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

use super::{file::get_logging_dir_path, util::create_env_filter};

pub fn start_tracer() -> (
    Handle<
        EnvFilter,
        Layered<Layer<Registry, DefaultFields, Format<Pretty>, NonBlocking>, Registry>,
    >,
    WorkerGuard,
) {
    let file_appender =
        tracing_appender::rolling::daily(get_logging_dir_path().unwrap(), "log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
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
    tracer.init();
    (handle, _guard)
}
