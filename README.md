# Requirements

- [PostgreSQL 15](https://postgresapp.com/downloads.html)
- Download the `.env` file from the discord server and save to project root.

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

   Run the DB seed script `seed.ts` for initial data. The script is idempotent 
   so you can run it again to reset the DB data.
   ```
   npx prisma db seed
   ```

# Running DB and App

1. Start the dev server in another terminal window, then navigate in a new browser
   tab to `localhost:3000`.

   ```
   npm run dev
   ```

   > Next.js will launch a dev server accessible over your local network. You
   > can access the dev server from another device on the same local network at 
   > `hostname.local:3000`. Get your hostname by typing `hostname` into the 
   > terminal.

2. Launch a db explorer. This command also confirms that prisma is working. This 
   command should open a brower window at `localhost:5555`.
   ```
   npx prisma studio
   ```
# Schema Updates

If `schema.prisma` receives updates, then you can push to a connected DB with:

```bash
# update db & generate client
npx prisma db push
```

Then run the idempotent seed script for initial dummy data:

```bash
npx prisma db seed
```

# Git Workflow

- Everyone works on their own branch and does a pull request to merge to `main`.
- Prefer squash commits unless your commits are very clean and atomic.
- A branch should be free of conflicts from `main` before merging.

# Recommended VS Code extensions

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- https://github.com/tailwindlabs/prettier-plugin-tailwindcss (Prettier plugin)