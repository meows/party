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

const parties = [
   {
      id: 1,
      name: "Cool Party",
      hostid: 1,
      bannerimage: "",
      time_start: new Date().toUTCString(),
      
      state: "CA",
      city: "San Francisco",
      zip: "94103",
      street_number: "123",
      street: "Fake Street",
      unit: "Apt 1",
      longitude: 37.7749,
      latitude: -122.4194,
      plus_code_global: "849VQH8R+R9",

      rsvp_users: [1, 2],
   }
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