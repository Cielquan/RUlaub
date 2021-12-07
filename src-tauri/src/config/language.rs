use std::fmt;

use serde::de::{self, Visitor};
use serde::{Deserialize, Serialize};

use super::types::StringEnum;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LanguageData {
    pub name: String,
    pub locale: String,
    pub import_name: String,
    pub date_mask: String,
}

impl LanguageData {
    pub fn new(language: Language) -> Self {
        match language {
            Language::DE => LanguageData {
                name: "Deutsch".to_string(),
                locale: Language::DE.to_string(),
                import_name: "deDE".to_string(),
                date_mask: "__.__.____".to_string(),
            },
            Language::EN => LanguageData {
                name: "English".to_string(),
                locale: Language::EN.to_string(),
                import_name: "enUS".to_string(),
                date_mask: "__/__/____".to_string(),
            },
        }
    }
}

#[derive(Clone)]
pub enum Language {
    DE,
    EN,
}

impl StringEnum for Language {
    fn new(value: &str) -> Self {
        match value {
            "de-DE" => Language::DE,
            "en-US" => Language::EN,
            _ => Language::DE,
        }
    }

    fn to_string(&self) -> String {
        match self {
            Language::DE => "de-DE".to_string(),
            Language::EN => "en-US".to_string(),
        }
    }
}

impl fmt::Debug for Language {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl Serialize for Language {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for Language {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(LanguageStringVisitor {})
    }
}

struct LanguageStringVisitor {}

impl<'de> Visitor<'de> for LanguageStringVisitor {
    type Value = Language;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an string matching the Language Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(Language::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(Language::new(&value))
    }
}
