# Requirements

- PostgreSQL 15
- Create an `env.json` file in project root and populate with the properties:
   - `db_user`
   - `db_name`

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
   npx prisma db seed
   ```

4. Start dev server.

   ```
   npm run dev
   ```

## Extras

Launch a db explorer.
```
npx prisma studio
```

# Git Workflow

- Everyone works on their own branch and does a pull request to merge to `main`.
- Prefer squash commits unless your commits are very clean and atomic.
- A branch should be free of conflicts from `main` before merging.