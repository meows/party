-- —————————————————————————————————————————————————————————————————————————————
-- Reset

DROP SCHEMA IF EXISTS party CASCADE;
CREATE SCHEMA party;
SET search_path TO party;

-- —————————————————————————————————————————————————————————————————————————————
-- Types

CREATE TYPE     RSVP       AS ENUM ('attending', 'waitlist');
CREATE DOMAIN   Email      VARCHAR(255);
CREATE DOMAIN   Phone      VARCHAR(64);
CREATE DOMAIN   Name       VARCHAR(64);
CREATE DOMAIN   Link       VARCHAR(255);

-- —————————————————————————————————————————————————————————————————————————————
-- Account

CREATE TABLE Account (
   id           SERIAL,
   name         TEXT        NOT NULL,
   email        Email       UNIQUE NOT NULL,
   phone        Phone       UNIQUE,
   host_id      TEXT        UNIQUE NOT NULL,
   -- used as drop-down options for party creation; 0th is default.
   -- on creation, the `email` and `phone` will be duplicated into `host_email` and `host_phone`
   host_email   Email       UNIQUE,
   host_phone   Phone       UNIQUE,
   hash         TEXT        NOT NULL,
   about        TEXT,
   is_host      BOOLEAN     DEFAULT FALSE NOT NULL,
   created      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updated      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
   seen         TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
   delete_by    TIMESTAMP   DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),

   PRIMARY KEY (id)
);

CREATE TABLE Settings (
   id      SERIAL,
   guest   INT,

   PRIMARY KEY (id),
   FOREIGN KEY (guest) REFERENCES Account(id)
);

CREATE TABLE Session (
   account   INT            NOT NULL,
   token     VARCHAR(255),
   expiry    TIMESTAMP      NOT NULL,

   PRIMARY KEY (token),
   FOREIGN KEY (account) REFERENCES Account(id)
);

-- —————————————————————————————————————————————————————————————————————————————
-- Party

CREATE TABLE Party (
   id              SERIAL,
   party_name      VARCHAR(255)   NOT NULL,
   banner_image    Link,
   host_id         INT            NOT NULL,
   chat_id         VARCHAR(255),

   time_start      TIMESTAMP      NOT NULL,
   time_end        TIMESTAMP,
   is_waitlist     BOOLEAN        DEFAULT FALSE NOT NULL,
   party_size      INT            DEFAULT 1000000 NOT NULL,
   price           INT            DEFAULT 0 NOT NULL,
   -- private means unlisted & location is hidden until rsvp
   is_private      BOOLEAN        DEFAULT FALSE NOT NULL,
   is_deleted      BOOLEAN        DEFAULT FALSE NOT NULL,
 
   state           VARCHAR(255)   NOT NULL,
   city            VARCHAR(255)   NOT NULL,
   zip             VARCHAR(255)   NOT NULL,
   street_number   VARCHAR(255)   NOT NULL,
   street          VARCHAR(255)   NOT NULL,
   unit            VARCHAR(255)   NOT NULL,
   longitude       REAL           NOT NULL,
   latitude        REAL           NOT NULL,
   plus_code       VARCHAR(255),

   widgets         JSONB,

   PRIMARY KEY (id),
   FOREIGN KEY (host_id) REFERENCES Account(id)
);

CREATE TABLE Attendance (
   party     INT,
   guest     INT,
   seen      TIMESTAMP   DEFAULT NULL,  -- person was seen at the party(qr code)
   rsvp      RSVP        DEFAULT 'attending' NOT NULL,
   paid      REAL        DEFAULT 0 NOT NULL,
   qr_code   TEXT,       -- svg for qr code

   PRIMARY KEY (party, guest),
   FOREIGN KEY (party) REFERENCES Party(id),
   FOREIGN KEY (guest) REFERENCES Account(id)
);