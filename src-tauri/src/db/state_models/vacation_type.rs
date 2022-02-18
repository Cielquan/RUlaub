use std::collections::HashMap;

pub type VacationTypeId = i32;
pub type VacationTypes = HashMap<VacationTypeId, VacationType>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VacationType {
    pub name: String,
    pub charge: bool,
    pub color_dark: HexColorCode,
    pub color_light: HexColorCode,
    pub active: bool,
}

pub type HexColorCode = String;
