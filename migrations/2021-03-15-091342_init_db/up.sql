CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    abbr VARCHAR(10) NOT NULL UNIQUE,
    vacation_days INTEGER(3) NOT NULL,
    hex_color INTEGER NOT NULL UNIQUE,
    group_manager_id INTEGER,
    FOREIGN KEY (group_manager_id) REFERENCES users (id)
);

CREATE TABLE states (
    id INTEGER NOT NULL PRIMARY KEY,
    state_abbr VARCHAR(2) NOT NULL UNIQUE,
    state_full VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE vacation_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    count BOOLEAN NOT NULL
);

CREATE TABLE school_holiday_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE school_holidays (
    id INTEGER NOT NULL PRIMARY KEY,
    state_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    comment VARCHAR(255),
    FOREIGN KEY (state_id) REFERENCES states (id),
    FOREIGN KEY (type_id) REFERENCES school_holiday_types (id)
);

CREATE TABLE public_holidays (
    id INTEGER NOT NULL PRIMARY KEY,
    state_id INTEGER NOT NULL,
    name VARCHAR(128) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states (id)
);

CREATE TABLE setups (
    id INTEGER NOT NULL PRIMARY KEY,
    year INTEGER(4) NOT NULL,
    state_id INTEGER NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states (id)
);

CREATE TABLE vacations (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type_id INTEGER NOT NULL,
    setup_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (type_id) REFERENCES vacation_types (id),
    FOREIGN KEY (setup_id) REFERENCES setups (id)
);
