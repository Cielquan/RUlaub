use crate::config;
use crate::config::types::StringEnum;

/// Take a tracing level and transform it into an [`EnvFilter`]. The [`EnvFilter`] can be used to
/// update the tracing level via the reload handle.
pub fn create_env_filter(level: &str) -> tracing_subscriber::EnvFilter {
    trace!(
        target = "tracing",
        message = "Create EnvFilter for given tracing level",
        level = level
    );
    match &level.to_uppercase()[..] {
        "TRACE" => tracing_subscriber::EnvFilter::new(tracing::Level::TRACE.as_str()),
        "DEBUG" => tracing_subscriber::EnvFilter::new(tracing::Level::DEBUG.as_str()),
        "INFO" => tracing_subscriber::EnvFilter::new(tracing::Level::INFO.as_str()),
        "WARN" => tracing_subscriber::EnvFilter::new(tracing::Level::WARN.as_str()),
        "ERROR" => tracing_subscriber::EnvFilter::new(tracing::Level::ERROR.as_str()),
        _ => tracing_subscriber::EnvFilter::new(tracing::Level::INFO.as_str()),
    }
}

lazy_static! {
    /// An array with the available log levels supported by the application.
    #[derive(Debug)]
    pub static ref AVAILABLE_LOG_LEVELS: [&'static str; 5] =
        ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];
}

/// An enum holding the available log levels supported by the application.
#[derive(Clone, PartialEq)]
pub enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
}

impl config::types::StringEnum for LogLevel {
    fn new(value: &str) -> Self {
        match &value.to_uppercase()[..] {
            "TRACE" => LogLevel::TRACE,
            "DEBUG" => LogLevel::DEBUG,
            "INFO" => LogLevel::INFO,
            "WARN" => LogLevel::WARN,
            "ERROR" => LogLevel::ERROR,
            _ => LogLevel::INFO,
        }
    }

    fn to_string(&self) -> String {
        match self {
            LogLevel::TRACE => "TRACE".to_string(),
            LogLevel::DEBUG => "DEBUG".to_string(),
            LogLevel::INFO => "INFO".to_string(),
            LogLevel::WARN => "WARN".to_string(),
            LogLevel::ERROR => "ERROR".to_string(),
        }
    }
}

impl std::fmt::Debug for LogLevel {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl serde::Serialize for LogLevel {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> serde::Deserialize<'de> for LogLevel {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(LogLevelStringVisitor {})
    }
}

struct LogLevelStringVisitor {}

impl<'de> serde::de::Visitor<'de> for LogLevelStringVisitor {
    type Value = LogLevel;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("an string matching the LogLevel Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(LogLevel::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(LogLevel::new(&value))
    }
}
