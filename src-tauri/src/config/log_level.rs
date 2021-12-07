use std::fmt;

use serde::de::{self, Visitor};
use serde::{Deserialize, Serialize};

use super::types::StringEnum;

#[derive(Clone)]
pub enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
}

impl StringEnum for LogLevel {
    fn new(value: &str) -> Self {
        match value {
            "trace" => LogLevel::TRACE,
            "debug" => LogLevel::DEBUG,
            "info" => LogLevel::INFO,
            "warn" => LogLevel::WARN,
            "error" => LogLevel::ERROR,
            _ => LogLevel::INFO,
        }
    }

    fn to_string(&self) -> String {
        match self {
            LogLevel::TRACE => "trace".to_string(),
            LogLevel::DEBUG => "debug".to_string(),
            LogLevel::INFO => "info".to_string(),
            LogLevel::WARN => "warn".to_string(),
            LogLevel::ERROR => "error".to_string(),
        }
    }
}

impl fmt::Debug for LogLevel {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl Serialize for LogLevel {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for LogLevel {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(LogLevelStringVisitor {})
    }
}

struct LogLevelStringVisitor {}

impl<'de> Visitor<'de> for LogLevelStringVisitor {
    type Value = LogLevel;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an string matching the LogLevel Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(LogLevel::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(LogLevel::new(&value))
    }
}
