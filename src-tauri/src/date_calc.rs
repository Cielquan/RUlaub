use std::collections::HashMap;
use std::mem;

use chrono::{Datelike, Duration, NaiveDate, Weekday};

struct DateRange(NaiveDate, NaiveDate);

impl Iterator for DateRange {
    type Item = NaiveDate;
    fn next(&mut self) -> Option<Self::Item> {
        if self.0 < self.1 {
            let next = self.0 + Duration::days(1);
            Some(mem::replace(&mut self.0, next))
        } else {
            None
        }
    }
}

pub fn is_leap_year(year: i32) -> bool {
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

type WeekdaySumMap = HashMap<Weekday, u32>;

/// Sum up the amount of each weekday in a range of two dates.
///
/// Optionally filter out days matching a given list of dates.
pub fn sum_weekdays_between(
    start_date: NaiveDate,
    end_date: NaiveDate,
    date_skip_list: Option<Vec<NaiveDate>>,
) -> Option<WeekdaySumMap> {
    trace!(
        target = "date_calc",
        message = "Sum weekdays in date range",
        start_date = ?start_date,
        end_date = ?end_date,
    );

    if end_date < start_date {
        error!(
            target = "date_calc",
            message = "Start date is bigger than end date",
            start_date = ?start_date,
            end_date = ?end_date,
        );
        return None;
    }

    let skip_list = date_skip_list.unwrap_or_default();

    let mut weekday_map = HashMap::from([
        (Weekday::Mon, 0),
        (Weekday::Tue, 0),
        (Weekday::Wed, 0),
        (Weekday::Thu, 0),
        (Weekday::Fri, 0),
        (Weekday::Sat, 0),
        (Weekday::Sun, 0),
    ]);

    for date in DateRange(start_date, end_date) {
        if skip_list.contains(&date) {
            trace!(
                target = "date_calc",
                message = "Skip date; date listed in skip list",
                date = ?date,
            );
            continue;
        }
        let weekday_map_entry = weekday_map.get_mut(&date.weekday()).unwrap();
        *weekday_map_entry = *weekday_map_entry + 1u32;
    }

    Some(weekday_map)
}

pub fn sum_workdays(weekday_sum_map: WeekdaySumMap, workdays: Vec<Weekday>) -> u32 {
    trace!(
        target = "date_calc",
        message = "Sum weekdays if day is workday",
        weekday_sum_map = ?weekday_sum_map,
        workdays = ?workdays,
    );
    let mut sum = 0;
    weekday_sum_map.into_iter().for_each(|(day, count)| {
        if workdays.contains(&day) {
            sum = sum + count
        }
    });
    sum
}
