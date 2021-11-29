use tracing::Level;
use tracing_subscriber::EnvFilter;

pub fn create_env_filter(level: &str) -> EnvFilter {
    trace!(
        target = "tracing",
        message = "Create EnvFilter for given tracing level.",
        level = level
    );
    match &level.to_uppercase()[..] {
        "TRACE" => EnvFilter::new(Level::TRACE.as_str()),
        "DEBUG" => EnvFilter::new(Level::DEBUG.as_str()),
        "INFO" => EnvFilter::new(Level::INFO.as_str()),
        "WARN" => EnvFilter::new(Level::WARN.as_str()),
        "ERROR" => EnvFilter::new(Level::ERROR.as_str()),
        _ => EnvFilter::new(Level::INFO.as_str()),
    }
}
