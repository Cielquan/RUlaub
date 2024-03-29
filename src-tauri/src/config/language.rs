use std::collections::HashMap;
use std::fmt;

use crate::config;
use crate::config::types::StringEnum;

lazy_static! {
    #[derive(Debug, Clone, Serialize, Deserialize)]
    pub static ref AVAILABLE_LANGUAGES: HashMap<&'static str, LanguageData> = HashMap::from(
        [
            ("de-DE", LanguageData {
                date_mask: "__.__.____".to_string(),
                import_name: "deDE".to_string(),
                locale: Language::DE.to_string(),
                name: "Deutsch".to_string(),
                flag: "🇩🇪".to_string(),
            }),
            ("en-US", LanguageData {
                date_mask: "__/__/____".to_string(),
                import_name: "enUS".to_string(),
                locale: Language::EN.to_string(),
                name: "English".to_string(),
                flag: "🇺🇸".to_string(),
            }),
        ]
    );
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LanguageData {
    pub date_mask: String,
    pub import_name: String,
    pub locale: String,
    pub name: String,
    pub flag: String,
}

impl LanguageData {
    pub fn new(language: Language) -> Self {
        if let Some(lang) = AVAILABLE_LANGUAGES.get(&language.to_string()[..]) {
            return lang.clone();
        }
        AVAILABLE_LANGUAGES.get("de-DE").unwrap().clone()
    }
}

#[derive(Clone, PartialEq)]
pub enum Language {
    DE,
    EN,
}

impl Language {
    pub fn from_languagedata(language_data: LanguageData) -> Self {
        match &language_data.locale[..] {
            "de-DE" => Language::DE,
            "en-US" => Language::EN,
            _ => Language::DE,
        }
    }
}

impl config::types::StringEnum for Language {
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

impl serde::Serialize for Language {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> serde::Deserialize<'de> for Language {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_string(LanguageStringVisitor {})
    }
}

struct LanguageStringVisitor {}

impl<'de> serde::de::Visitor<'de> for LanguageStringVisitor {
    type Value = Language;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an string matching the Language Enum's values")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(Language::new(value))
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(Language::new(&value))
    }
}
