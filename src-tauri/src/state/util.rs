#[derive(Debug, Clone, Serialize)]
pub struct DateData {
    pub date: ISODate,
    pub year_day: i32,
    pub year: i32,
}

pub type ISODate = String;
