table! {
    public_holidays (id) {
        id -> Integer,
        state_id -> Integer,
        name -> Text,
        date -> Date,
    }
}

table! {
    school_holiday_types (id) {
        id -> Integer,
        name -> Text,
    }
}

table! {
    school_holidays (id) {
        id -> Integer,
        state_id -> Integer,
        type_id -> Integer,
        start_date -> Date,
        end_date -> Date,
        comment -> Nullable<Text>,
    }
}

table! {
    setups (id) {
        id -> Integer,
        year -> Integer,
        state_id -> Integer,
    }
}

table! {
    states (id) {
        id -> Integer,
        state_abbr -> Text,
        state_full -> Text,
    }
}

table! {
    users (id) {
        id -> Integer,
        name -> Text,
        vacation_days -> Integer,
        hex_color -> Integer,
        group_manager_id -> Nullable<Integer>,
    }
}

table! {
    vacation_types (id) {
        id -> Integer,
        name -> Text,
        count -> Bool,
    }
}

table! {
    vacations (id) {
        id -> Integer,
        user_id -> Integer,
        start_date -> Date,
        end_date -> Date,
        type_id -> Integer,
        setup_id -> Integer,
    }
}

joinable!(public_holidays -> states (state_id));
joinable!(school_holidays -> school_holiday_types (type_id));
joinable!(school_holidays -> states (state_id));
joinable!(setups -> states (state_id));
joinable!(vacations -> setups (setup_id));
joinable!(vacations -> users (user_id));
joinable!(vacations -> vacation_types (type_id));

allow_tables_to_appear_in_same_query!(
    public_holidays,
    school_holiday_types,
    school_holidays,
    setups,
    states,
    users,
    vacation_types,
    vacations,
);
