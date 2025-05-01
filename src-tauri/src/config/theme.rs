use std::fmt;

use crate::config;
use crate::config::types::StringEnum;

#[derive(Clone, PartialEq)]
pub enum Theme {
    DARK,
    LIGHT,
}

impl config::types::StringEnum for Theme {
    fn new(value: &str) -> Self {
        match value {
            "dark" => Theme::DARK,
            "light" => Theme::LIGHT,
            _ => Theme::DARK,
        }
    }

    fn to_string(&self) -> String {
        match self {
            Theme::DARK => "dark".to_string(),
            Theme::LIGHT => "light".to_string(),
        }
    }
}

impl fmt::Debug for Theme {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl serde::Serialize for Theme {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> serde::Deserialize<'de> for Theme {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(ThemeStringVisitor {})
    }
}

struct ThemeStringVisitor {}

impl<'de> serde::de::Visitor<'de> for ThemeStringVisitor {
    type Value = Theme;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an string matching the Theme Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(Theme::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(Theme::new(&value))
    }
}
