-- generator client {
--   provider = "prisma-client-js"
-- }

-- datasource db {
--   provider = "postgresql"
--   url      = env("DATABASE_URL")
-- }

-- model chatrooms {
--   id       Int        @id @default(autoincrement())
--   parties  parties    @relation(fields: [id], references: [id], onDelete: NoAction, onUpdate: NoAction)
--   messages messages[]
-- }

-- model messages {
--   id        Int       @id @default(autoincrement())
--   chatid    Int
--   senderid  Int
--   content   String
--   createdat DateTime? @default(now()) @db.Timestamp(6)
--   chatrooms chatrooms @relation(fields: [chatid], references: [id], onDelete: NoAction, onUpdate: NoAction)
--   users     users     @relation(fields: [senderid], references: [id], onDelete: NoAction, onUpdate: NoAction)
-- }

-- model parties {
--   id          Int        @id @default(autoincrement())
--   name        String     @db.VarChar(255)
--   host        Int
--   hostid      Int
--   chatid      String     @db.VarChar(255)
--   bannerimage Bytes
--   chatrooms   chatrooms?
--   users       users      @relation(fields: [hostid], references: [id], onDelete: NoAction, onUpdate: NoAction)
-- }

-- model sessions {
--   name   String   @db.VarChar(255)
--   token  String   @id @db.VarChar(255)
--   expiry DateTime @db.Timestamp(6)
--   client Boolean  @default(true)
-- }

-- model users {
--   id       Int        @id @default(autoincrement())
--   email    String?    @unique @db.VarChar(255)
--   phone    String?    @unique @db.VarChar(255)
--   hash     String     @db.VarChar(255)
--   messages messages[]
--   parties  parties[]
-- }

CREATE TABLE USERS {
    
}