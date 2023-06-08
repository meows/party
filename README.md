# Requirements

- [PostgreSQL 15](https://postgresapp.com/downloads.html)
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

   Run the DB seed script `~/prisma/seed.ts` for initial data.
   ```
   npx prisma db seed
   ```

# Running DB and App

1. Start dev server in another terminal window then nagivate in a new browser tab to `localhost:3000`.

   ```
   npm run dev
   ```

   > Next.js will launch a dev server accessible over your local network.

2. Launch a db explorer. This command also confirms that prisma is working. This command should open a brower window at `localhost:5555`.
   ```
   npx prisma studio
   ```

# Git Workflow

- Everyone works on their own branch and does a pull request to merge to `main`.
- Prefer squash commits unless your commits are very clean and atomic.
- A branch should be free of conflicts from `main` before merging.

# Recommended VS Code extensions

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma). Use this to tell you what the DB is expecting and to get the DB API.
- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Use this to format code. Open command search in VSCode (macOS shortcut is command + p) and search ">Format Document".
