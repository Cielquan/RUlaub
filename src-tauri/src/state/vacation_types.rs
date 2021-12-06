use std::collections::HashMap;

pub type VacationTypes = HashMap<i32, VacationType>;

pub struct VacationType {
    pub name: String,
    pub charge: bool,
    pub color_dark: String,
    pub color_light: String,
    pub active: bool,
}
