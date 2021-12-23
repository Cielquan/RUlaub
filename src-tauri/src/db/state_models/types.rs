use chrono::NaiveDate;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DateData {
    pub date: ISODate,
    pub year_day: i32,
    pub year: i32,
}

pub type ISODate = String;

pub fn naive_date_to_iso_date(naive_date: NaiveDate) -> ISODate {
    naive_date.format("%Y-%m-%d").to_string()
}

pub fn iso_date_to_naive_date(iso_date: ISODate) -> Option<NaiveDate> {
    trace!(target = "db", message = "Parse ISO date string", iso_date = ?iso_date);
    match NaiveDate::parse_from_str(&iso_date, "%Y-%m-%d") {
        Err(err) => {
            error!(
                target = "db",
                message = "Failed to parse ISO date string",
                iso_date = ?iso_date,
                error = ?err,
            );
            None
        }
        Ok(date) => Some(date),
    }
}
