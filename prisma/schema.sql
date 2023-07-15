-- —————————————————————————————————————————————————————————————————————————————
-- Reset

DROP SCHEMA IF EXISTS party CASCADE;
CREATE SCHEMA party;
SET search_path TO party;

-- —————————————————————————————————————————————————————————————————————————————
-- Types

CREATE TYPE     RSVP    AS ENUM ('yes', 'no', 'maybe', 'waitlist');
CREATE DOMAIN   Email   VARCHAR(255);
CREATE DOMAIN   Phone   VARCHAR(64);
CREATE DOMAIN   Name    VARCHAR(64);
CREATE DOMAIN   Link    VARCHAR(255);

-- —————————————————————————————————————————————————————————————————————————————
-- Account

CREATE TABLE Account (
   id          SERIAL,
   name        TEXT        NOT NULL,
   email       Email       UNIQUE NOT NULL,
   phone       Phone       UNIQUE,
   hash        TEXT        NOT NULL,
   about       TEXT        DEFAULT NULL,
   created     TIMESTAMP   DEFAULT NOW() NOT NULL,
   updated     TIMESTAMP   DEFAULT NOW() NOT NULL,
   seen        TIMESTAMP   DEFAULT NOW() NOT NULL,
   delete_by   TIMESTAMP   DEFAULT (NOW() + INTERVAL '30 days'),

   PRIMARY KEY (id)
);

CREATE TABLE Profile (
   profile_owner   INT,
   about           TEXT   DEFAULT NULL,
   twitter         Link   DEFAULT NULL,
   facebook        Link   DEFAULT NULL,
   instagram       Link   DEFAULT NULL,
   website         Link   DEFAULT NULL,

   PRIMARY KEY (profile_owner),
   FOREIGN KEY (profile_owner) REFERENCES Account(id)
)

CREATE TABLE Setting (
   setting_owner   INT,
   is_host         BOOLEAN   DEFAULT FALSE NOT NULL,  -- host-based GUI switch

   PRIMARY KEY (setting_owner),
   FOREIGN KEY (setting_owner) REFERENCES Account(id)
);

CREATE TABLE Session (
   session_owner   INT         NOT NULL,
   token           TEXT        NOT NULL,
   expiry          TIMESTAMP   NOT NULL,

   PRIMARY KEY (token),
   FOREIGN KEY (session_owner) REFERENCES Account(id)
);

-- —————————————————————————————————————————————————————————————————————————————
-- Party

-- is_private means unlisted & location is hidden until rsvp
-- is_deleted completely hides the party, but saved for bill record reasons
CREATE TABLE Party (
   id             SERIAL,
   party_name     TEXT        NOT NULL,
   banner         Link        DEFAULT NULL,
   host           INT         NOT NULL,
   chat_id        TEXT        DEFAULT NULL,
   created        TIMESTAMP   DEFAULT NOW() NOT NULL,
   updated        TIMESTAMP   DEFAULT NOW() NOT NULL,
   time_start     TIMESTAMP   NOT NULL,
   time_end       TIMESTAMP   DEFAULT NULL,
   is_waitlist    BOOLEAN     DEFAULT FALSE NOT NULL,
   party_size     INT         DEFAULT NULL, -- null means infinite
   price          INT         DEFAULT 0     NOT NULL,
   widgets        JSONB       DEFAULT NULL,
   state          TEXT        NOT NULL,
   city           TEXT        NOT NULL,
   zip            TEXT        NOT NULL,
   street         TEXT        NOT NULL,
   unit           TEXT        DEFAULT NULL,
   longitude      REAL        NOT NULL,
   latitude       REAL        NOT NULL,
   is_private     BOOLEAN     DEFAULT FALSE NOT NULL,
   is_deleted     BOOLEAN     DEFAULT FALSE NOT NULL,
   is_published   BOOLEAN     DEFAULT FALSE NOT NULL,

   PRIMARY KEY (id),
   FOREIGN KEY (host) REFERENCES Account(id)
);

CREATE TABLE Attendance (
   party_id   INT,
   guest_id   INT,
   seen       TIMESTAMP   DEFAULT NULL,
   rsvp       RSVP        DEFAULT 'yes' NOT NULL,
   paid       REAL        DEFAULT 0     NOT NULL,
   qr_code    TEXT        DEFAULT NULL, -- svg for qr code

   PRIMARY KEY (party_id, guest_id),
   FOREIGN KEY (party_id) REFERENCES Party(id),
   FOREIGN KEY (guest_id) REFERENCES Account(id)
);

-- —————————————————————————————————————————————————————————————————————————————
-- Indices

CREATE INDEX idx_party_time_start ON Party (time_start) WHERE NOT is_deleted;
CREATE INDEX idx_party_time_end   ON Party (time_end)   WHERE NOT is_deleted;
CREATE INDEX idx_attendance_guest ON Attendance (guest_id);