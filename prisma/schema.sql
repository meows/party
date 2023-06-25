-- —————————————————————————————————————————————————————————————————————————————
-- Reset

DROP SCHEMA IF EXISTS party CASCADE;
CREATE SCHEMA party;
SET search_path TO party;

-- —————————————————————————————————————————————————————————————————————————————
-- Types

CREATE TYPE     Property   AS ENUM ('residential', 'commercial');
CREATE DOMAIN   Email      VARCHAR(255);
CREATE DOMAIN   Phone      VARCHAR(64);
CREATE DOMAIN   Name       VARCHAR(64);
CREATE DOMAIN   Link       VARCHAR(255);

-- —————————————————————————————————————————————————————————————————————————————
-- User & Auth

CREATE TABLE User {
    id         SERIAL,
    email      Email UNIQUE,
    phone      Phone UNIQUE,
    -- used as drop-down options for party creation; 0th is default.
    -- on creation, the `email` and `phone` will be duplicated into 
    -- `host_email` and `host_phone`; user can change later.
    host_email Email[] UNIQUE,
    host_phone Phone[] UNIQUE,

    hash       VARCHAR(255) NOT NULL,
    created    TIMESTAMP DEFAULT NOW(),
    updated    TIMESTAMP DEFAULT NOW(),
    seen       TIMESTAMP DEFAULT NOW(),
    delete_by  TIMESTAMP DEFAULT NOW() + INTERVAL '30 days', -- permanent account is start of linux epoch
    about      VARCHAR(255),
    widget     JSONB,
    is_host    BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (id)
};

CREATE TABLE Session {
    id       SERIAL,
    token    VARCHAR(255) UNIQUE,
    expiry   TIMESTAMP,
    client   BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (id)
}

CREATE TABLE Settings {
    id       SERIAL,
    user_id  INT REFERENCES USER(id),

    PRIMARY KEY (id)
}

-- —————————————————————————————————————————————————————————————————————————————
-- Party

CREATE TABLE Party {
    id              SERIAL,
    party_name      Name,
    host_id         INT REFERENCES USER(id),
    chat_id         VARCHAR(255),
    host_email      Email,
    host_phone      Phone,
    time_start      TIMESTAMP,
    time_end        TIMESTAMP,
    banner_image    Link,

    state           VARCHAR(255),
    city            VARCHAR(255),
    zip             VARCHAR(255),
    street_number   VARCHAR(255),
    street          VARCHAR(255),
    unit            VARCHAR(255),
    longitude       DOUBLE PRECISION,
    latitude        DOUBLE PRECISION,
    plus_code       VARCHAR(255),
    widgets         JSONB,
    guests          JSONB,

    PRIMARY KEY (id)
};

CREATE TABLE Attendance {
    guest_id   INT,
    party_id   INT,

    PRIMARY KEY (guest_id, party_id),
    FOREIGN KEY (guest_id) REFERENCES USER(id),
    FOREIGN KEY (party_id) REFERENCES PARTY(id)
};