use chrono::NaiveDate;

use super::super::state_models::types::ISODate;

pub fn naive_date_to_iso_date(naive_date: NaiveDate) -> ISODate {
    naive_date.format("%Y-%m-%d").to_string()
}

pub fn iso_date_to_naive_date(iso_date: ISODate) -> anyhow::Result<NaiveDate> {
    trace!(target = "database", message = "Parse ISO date string", iso_date = ?iso_date);
    match NaiveDate::parse_from_str(&iso_date, "%Y-%m-%d") {
        Err(err) => {
            error!(
                target = "database",
                message = "Failed to parse ISO date string",
                iso_date = ?iso_date,
                error = ?err,
            );
            Err(err.into())
        }
        Ok(date) => Ok(date),
    }
}
