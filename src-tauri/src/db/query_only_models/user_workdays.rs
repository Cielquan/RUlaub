/// A partial database model for users holding only the workdays.
#[derive(Queryable, Debug)]
pub struct UserWorkdays {
    pub id: i32,
    pub monday: bool,
    pub tuesday: bool,
    pub wednesday: bool,
    pub thursday: bool,
    pub friday: bool,
    pub saturday: bool,
    pub sunday: bool,
}
