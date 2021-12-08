use std::fmt;

use serde::de::{self, Visitor};
use serde::{Deserialize, Serialize};

use super::types::StringEnum;

lazy_static! {
    #[derive(Debug)]
    pub static ref AVAILABLE_THEMES: [&'static str; 2] = ["dark", "light"];
}

#[derive(Clone)]
pub enum Theme {
    DARK,
    LIGHT,
}

impl StringEnum for Theme {
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

impl Serialize for Theme {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for Theme {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(ThemeStringVisitor {})
    }
}

struct ThemeStringVisitor {}

impl<'de> Visitor<'de> for ThemeStringVisitor {
    type Value = Theme;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an string matching the Theme Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(Theme::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(Theme::new(&value))
    }
}
