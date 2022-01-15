use std::mem;

use chrono::{Duration, NaiveDate};

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
