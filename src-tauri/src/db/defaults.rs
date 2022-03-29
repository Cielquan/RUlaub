mod public_holiday;
mod school_holiday_link;
mod vacation_type;

#[tracing::instrument(skip(conn))]
pub fn add_default_values_to_db(conn: &diesel::SqliteConnection) -> diesel::QueryResult<()> {
    debug!(
        target = "database-defaults",
        message = "Start adding defaults to database"
    );

    public_holiday::add_default_public_holidays(&conn)?;
    school_holiday_link::add_default_school_holiday_link(&conn)?;
    vacation_type::add_default_vacation_types(&conn)?;

    debug!(
        target = "database-defaults",
        message = "Finished adding database defaults"
    );

    Ok(())
}
