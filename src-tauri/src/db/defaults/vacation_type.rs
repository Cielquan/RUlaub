use diesel::prelude::*;

use crate::db;

lazy_static! {
    #[derive(Debug, Clone)]
    static ref DEFAULT_VACATION_TYPES: Vec<db::models::NewVacationType<'static>> = {
        vec![
            // TODO: add sane defaults
            db::models::VacationType::create_new_entry("Urlaub", &true, "dark", "light", &true),
        ]
    };
}

pub fn add_default_vacation_types(conn: &diesel::SqliteConnection) -> diesel::QueryResult<()> {
    use db::schema::vacation_types::dsl::vacation_types;

    let insertable = &*DEFAULT_VACATION_TYPES;
    if let Err(err) = diesel::insert_into(vacation_types)
        .values(insertable.clone())
        .execute(conn)
    {
        error!(
            target = "database",
            message = "Failed to insert entry to vacation_types db table",
            error = ?err,
            entry = ?insertable
        );
        return Err(err);
    }

    Ok(())
}
