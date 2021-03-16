use super::super::schema::states;

#[derive(Queryable)]
pub struct State {
    pub id: i32,
    pub state_abbr: String,
    pub state_full: String,
}
#[derive(Insertable)]
#[table_name = "states"]
pub struct NewState<'a> {
    pub state_abbr: &'a str,
    pub state_full: &'a str,
}

impl State {
    pub fn new<'a>(state_abbr: &'a str, state_full: &'a str) -> NewState<'a> {
        NewState {
            state_abbr,
            state_full,
        }
    }
}
