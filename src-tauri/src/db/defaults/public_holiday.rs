use diesel::prelude::*;

use crate::db;

lazy_static! {
    #[derive(Debug, Clone)]
    static ref DEFAULT_PUBLIC_HOLIDAYS: Vec<db::models::NewPublicHoliday<'static>> = {
        vec![
            // TODO: check defaults
            db::models::PublicHoliday::create_new_entry("Neujahr", None, Some("01-01"), None),
            db::models::PublicHoliday::create_new_entry("Tag der Arbeit", None, Some("05-01"), None),
            db::models::PublicHoliday::create_new_entry("Tag der deutschen Einheit", None, Some("10-03"), None),
            db::models::PublicHoliday::create_new_entry("1. Weihnachtsfeiertag", None, Some("12-25"), None),
            db::models::PublicHoliday::create_new_entry("2. Weihnachtsfeiertag", None, Some("12-26"), None),
        ]
    };
}

pub fn add_default_public_holidays(conn: &diesel::SqliteConnection) -> diesel::QueryResult<()> {
    use db::schema::public_holidays::dsl::public_holidays;

    let insertable = &*DEFAULT_PUBLIC_HOLIDAYS;
    if let Err(err) = diesel::insert_into(public_holidays)
        .values(insertable.clone())
        .execute(conn)
    {
        error!(
            target = "database",
            message = "Failed to insert entry to public_holidays db table",
            error = ?err,
            entry = ?insertable
        );
        return Err(err);
    }

    Ok(())
}
