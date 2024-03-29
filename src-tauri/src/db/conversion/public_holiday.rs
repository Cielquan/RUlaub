use std::collections::HashMap;

use chrono::{Datelike, NaiveDate};

use super::date_type;
use crate::date_calc;
use crate::db::{models, state_models};

pub fn yearless_date_to_year_day(
    yearless_date: &state_models::public_holiday::YearlessISODate,
    year: i32,
) -> anyhow::Result<i32> {
    let iso_date = format!("{}-{}", year, yearless_date);
    Ok(date_type::iso_date_to_naive_date(iso_date)?
        .ordinal()
        .try_into()
        .unwrap())
}

pub fn easter_sunday_offset_to_year_day(easter_sunday_offset: i32, year: i32) -> Option<i32> {
    let easter_sunday = calc_easter_sunday(year);

    let easter_sunday_ordinal: i32 = easter_sunday.ordinal().try_into().unwrap();
    let day_sum = easter_sunday_ordinal + easter_sunday_offset;
    let max_days = match date_calc::is_leap_year(year) {
        false => 365,
        true => 366,
    };

    if day_sum < 1 || day_sum > max_days {
        error!(
            target = "database-data",
            message = "The easter sunday offset is out of range for this year",
            year = year,
            easter_sunday_offset = easter_sunday_offset,
            easter_sunday = ?easter_sunday,
        );
        return None;
    }

    let date = easter_sunday + chrono::Duration::days(easter_sunday_offset.into());
    Some(date.ordinal().try_into().unwrap())
}

/// Calculate the date of easter sunday for a year
///
/// The Calculation is based on the updated version of the
/// Easterformula by Gauß from Heiner Lichtenberg
pub fn calc_easter_sunday(year: i32) -> NaiveDate {
    let k = year / 100;
    let m = 15 + (3 * k + 3) / 4 - (8 * k + 13) / 25;
    let s = 2 - (3 * k + 3) / 4;
    let a = year % 19;
    let d = (19 * a + m) % 30;
    let r = (d + a / 11) / 29;
    let og = 21 + d - r;
    let sz = 7 - (year + year / 4 + s) % 7;
    let oe = 7 - (og - sz) % 7;
    let os = (og + oe).try_into().unwrap();

    if os > 31 {
        NaiveDate::from_ymd(year, 4, os - 31)
    } else {
        NaiveDate::from_ymd(year, 3, os)
    }
}

fn try_add_date_based_holiday(
    entry: &models::PublicHoliday,
    yearless_date: String,
    calc_year: i32,
    error_count: &mut u32,
    map: &mut state_models::PublicHolidays,
) {
    if let Ok(year_day) = yearless_date_to_year_day(&yearless_date, calc_year) {
        map.insert(
            entry.id,
            state_models::PublicHolidayVariant::DateBasedHoliday(
                state_models::public_holiday::DateBasedHoliday {
                    name: entry.name.clone(),
                    yearless_date,
                    year: entry.year,
                    calc: state_models::public_holiday::Calc { year_day },
                },
            ),
        );
    } else {
        *error_count += 1;
        error!(
            target = "database-data",
            message = "Failed to calculate the ordinal for a date based PublicHoliday",
            yearless_date = ?yearless_date,
            year = calc_year,
        );
    }
}

fn try_add_offset_based_holiday(
    entry: &models::PublicHoliday,
    easter_sunday_offset: i32,
    calc_year: i32,
    error_count: &mut u32,
    map: &mut state_models::PublicHolidays,
) {
    if let Some(year_day) = easter_sunday_offset_to_year_day(easter_sunday_offset, calc_year) {
        map.insert(
            entry.id,
            state_models::PublicHolidayVariant::EasterBasedHoliday(
                state_models::public_holiday::EasterBasedHoliday {
                    name: entry.name.clone(),
                    easter_sunday_offset,
                    year: entry.year,
                    calc: state_models::public_holiday::Calc { year_day },
                },
            ),
        );
    } else {
        *error_count += 1;
        error!(
            target = "database-data",
            message = "Failed to calculate the ordinal for a offset based PublicHoliday",
            easter_sunday_offset = easter_sunday_offset,
            year = calc_year,
        );
    }
}

pub fn to_state_model(
    db_data: Vec<models::PublicHoliday>,
    display_year: i32,
) -> (state_models::PublicHolidays, u32) {
    trace!(
        target = "database-data",
        message = "Convert db entries for PublicHoliday to state data",
    );

    let mut error_count = 0;
    let mut map = HashMap::new();

    for entry in db_data.iter() {
        let calc_year = entry.year.unwrap_or(display_year);

        if let Some(yearless_date) = entry.yearless_date.clone() {
            try_add_date_based_holiday(entry, yearless_date, calc_year, &mut error_count, &mut map)
        } else if let Some(easter_sunday_offset) = entry.easter_sunday_offset {
            try_add_offset_based_holiday(
                entry,
                easter_sunday_offset,
                calc_year,
                &mut error_count,
                &mut map,
            )
        } else {
            error_count += 1;
            error!(
                target = "database-data",
                message = "Invalid PublicHoliday db entry; failed to convert to state data",
                entry = ?entry,
            );
        }
    }

    if error_count > 0 {
        debug!(
            target = "database-data",
            message = "Encounterd erros while loading PublicHoliday db entries",
            error_count = error_count,
        );
    }

    (map, error_count)
}

pub fn to_new_db_model(
    new_entries: &Vec<state_models::PublicHoliday>,
) -> Vec<models::NewPublicHoliday> {
    trace!(
        target = "database-data",
        message = "Convert new state data to PublicHoliday db models",
    );

    let mut db_models = Vec::new();

    for entry_variant in new_entries {
        match entry_variant {
            state_models::PublicHolidayVariant::DateBasedHoliday(entry) => {
                db_models.push(models::PublicHoliday::create_new_entry(
                    &entry.name,
                    entry.year.as_ref(),
                    Some(&entry.yearless_date),
                    None,
                ))
            }
            state_models::PublicHolidayVariant::EasterBasedHoliday(entry) => {
                db_models.push(models::PublicHoliday::create_new_entry(
                    &entry.name,
                    entry.year.as_ref(),
                    None,
                    Some(&entry.easter_sunday_offset),
                ))
            }
        }
    }

    db_models
}

pub fn to_update_db_model(
    updated_entries: state_models::PublicHolidays,
) -> Vec<models::PublicHoliday> {
    trace!(
        target = "database-data",
        message = "Convert updated state data to PublicHoliday db models",
    );

    let mut db_models = Vec::new();

    for (id, entry_variant) in updated_entries {
        match entry_variant {
            state_models::PublicHolidayVariant::DateBasedHoliday(entry) => {
                db_models.push(models::PublicHoliday::create_update_entry(
                    id,
                    entry.name,
                    entry.year,
                    Some(entry.yearless_date),
                    None,
                ))
            }
            state_models::PublicHolidayVariant::EasterBasedHoliday(entry) => {
                db_models.push(models::PublicHoliday::create_update_entry(
                    id,
                    entry.name,
                    entry.year,
                    None,
                    Some(entry.easter_sunday_offset),
                ))
            }
        }
    }

    db_models
}
