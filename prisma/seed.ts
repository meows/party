import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

// —————————————————————————————————————————————————————————————————————————————
// Data

const users = [
   {
      name: "Meow",
      email: "",
      phone: "",
      hash: "",      
   },
   {
      name: "Moo",
      email: "",
      phone: "",
      hash: "",      
   },
]

// —————————————————————————————————————————————————————————————————————————————
// Execute Query

async function main() {
   db.users.createMany({ data: users })
}

main()
   .then(async () => db.$disconnect())
   .catch(async (e) => {
      console.error(e)
      await db.$disconnect()
      process.exit(1)
   })