use diesel::prelude::*;

use crate::db;

const DEFAULT_LINK: &str = "https://raw.githubusercontent.com/Cielquan/holidAPI/main/api/state/NW/year/%year%/holidays.json";

pub fn add_default_school_holiday_link(conn: &diesel::SqliteConnection) -> diesel::QueryResult<()> {
    use db::schema::school_holidays_link::dsl::school_holidays_link;

    let insertable = db::models::SchoolHolidayLink::create_new_entry(DEFAULT_LINK);
    if let Err(err) = diesel::insert_into(school_holidays_link)
        .values(insertable.clone())
        .execute(conn)
    {
        error!(
            target = "database",
            message = "Failed to insert entry to school_holidays_link db table",
            error = ?err,
            entry = ?insertable
        );
        return Err(err);
    }

    Ok(())
}
