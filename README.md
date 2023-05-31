# Requirements

- <a href="https://postgresapp.com/downloads.html">PostgreSQL 15</a>
   - Click "initialize" in postgres app to start db, double click the "postgres" one.
- Download the ".env" file from the discord server and save it as ".env" in top level directory aka Party/

# Installation

1. Clone repo.

   ```
   git clone git@github.com:meows/party.git && cd party
   ```

2. Install npm dependencies.

   ```
   npm i
   ```

3. Setup database schema & generate client.
   ```
   npx prisma db push
   ```

   // TODO: explain what this line does
   ```
   npx prisma db seed
   ```

4. Start dev server in another terminal window then nagivate in a new browser tab to localhost:3000.

   ```
   npm run dev
   ```

5. Launch a db explorer. This command also confirms that prisma is working? This command should open a brower window at localhost:5555.
   ```
   npx prisma studio
   ```

# Git Workflow

- Everyone works on their own branch and does a pull request to merge to `main`.
- Prefer squash commits unless your commits are very clean and atomic.
- A branch should be free of conflicts from `main` before merging.

# VS code extensions

- Prisma. It should have around 869k downloads. Use this to tell you what the DB is expecting and get DB API.
- Tailwind. It should have around 3.2M downloads.
- Prettier. It should have around 32.7M downloads. Use this to format document. Open command search in VScode(macOS shortcut is command + p) then search ">Format Document"
- 