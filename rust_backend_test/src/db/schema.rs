table! {
    public_holidays (id) {
        id -> Integer,
        name -> Text,
        year -> Nullable<Integer>,
        yearless_date -> Nullable<Text>,
        easter_sunday_offset -> Nullable<Integer>,
    }
}

table! {
    school_holidays (id) {
        id -> Integer,
        name -> Text,
        start_date -> Date,
        start_year_day -> Integer,
        start_year -> Integer,
        end_date -> Date,
        end_year_day -> Integer,
        end_year -> Integer,
    }
}

table! {
    users (id) {
        id -> Integer,
        name -> Text,
        vacation_days -> Integer,
        monday -> Bool,
        tuesday -> Bool,
        wednesday -> Bool,
        thursday -> Bool,
        friday -> Bool,
        saturday -> Bool,
        sunday -> Bool,
    }
}

table! {
    vacation_types (id) {
        id -> Integer,
        name -> Text,
        charge -> Bool,
        color_dark -> Text,
        color_light -> Text,
        active -> Bool,
    }
}

table! {
    vacations (id) {
        id -> Integer,
        user_id -> Integer,
        vacation_type_id -> Integer,
        start_date -> Date,
        start_year_day -> Integer,
        start_year -> Integer,
        end_date -> Date,
        end_year_day -> Integer,
        end_year -> Integer,
    }
}

joinable!(vacations -> users (user_id));
joinable!(vacations -> vacation_types (vacation_type_id));

allow_tables_to_appear_in_same_query!(
    public_holidays,
    school_holidays,
    users,
    vacation_types,
    vacations,
);
