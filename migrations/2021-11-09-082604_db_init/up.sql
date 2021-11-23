CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    vacation_days INTEGER(3) NOT NULL,
    monday BOOLEAN NOT NULL,
    tuesday BOOLEAN NOT NULL,
    wednesday BOOLEAN NOT NULL,
    thursday BOOLEAN NOT NULL,
    friday BOOLEAN NOT NULL,
    saturday BOOLEAN NOT NULL,
    sunday BOOLEAN NOT NULL
);

CREATE TABLE vacation_types (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    charge BOOLEAN NOT NULL,
    color_dark VARCHAR(9) NOT NULL,
    color_light VARCHAR(9) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE vacations (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    vacation_type_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    start_year_day INTEGER(3) NOT NULL,
    start_year INTEGER(4) NOT NULL,
    end_date DATE NOT NULL,
    end_year_day INTEGER(3) NOT NULL,
    end_year INTEGER(4) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (vacation_type_id) REFERENCES vacation_types (id)
);

CREATE TABLE school_holidays (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    start_date DATE NOT NULL,
    start_year_day INTEGER(3) NOT NULL,
    start_year INTEGER(4) NOT NULL,
    end_date DATE NOT NULL,
    end_year_day INTEGER(3) NOT NULL,
    end_year INTEGER(4) NOT NULL
);

CREATE TABLE public_holidays (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    year INTEGER(4),
    yearless_date VARCHAR(5),
    easter_sunday_offset INTEGER
);
