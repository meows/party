import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

// —————————————————————————————————————————————————————————————————————————————
// Data

const accounts = [
   {
      id: 1,
      name: "Meow",
      email: "meow@meow.com",
      phone: "12345678",
      hash: "example_hash",
      about: "hi",
   },
   {
      id: 2,
      name: "Moo",
      email: "moo@moo.com",
      phone: "0001112222",
      hash: "example_hash_moo",
      about: "hi this is moo",
   },
   {
      id: 3,
      name: "Bark",
      email: "bark@bark.com",
      phone: "0000000001",
      hash: "example_hash_bark",
      about: "hi this is bark",
   },
   {
      id: 4,
      name: "Woof",
      email: "woof@woof.com",
      phone: "0000000002",
      hash: "example_hash_woof",
      about: "hi this is woof",
   },
   {
      id: 5,
      name: "Quack",
      email: "quack@quack.com",
      phone: "0000000003",
      hash: "example_hash_quack",
      about: "hi this is quack",
   }
]

const parties = [
   {
      id: 1,
      party_name: "Hack Night Party",
      banner_image: "/party/banner.jpg",
      host_id: 2,
      time_start: new Date(),
      state: "CA",
      city: "San Francisco",
      zip: "94103",
      street: "1 Fake Street",
      unit: "Apt 1",
      longitude: 37.7749,
      latitude: -122.4194,
      plus_code: "849VQH8R+R9",
      widgets: JSON.stringify({}),
   },
   {
      id: 2,
      party_name: "Generative AI Party",
      banner_image: "/party/banner.jpg",
      host_id: 5,
      time_start: new Date(),
      state: "CA",
      city: "Los Angeles",
      zip: "90001",
      street: "2 Fake Street",
      longitude: 34.0522,
      latitude: -118.2437,
      plus_code: "849VQH8R+R9",
      widgets: JSON.stringify({}),
   }
]

const attendance = [
   { party: 1, guest: 1, },
   { party: 1, guest: 2, },
   { party: 1, guest: 4, },
   { party: 2, guest: 1, },
   { party: 2, guest: 2, },
   { party: 2, guest: 3, },
   { party: 2, guest: 4, },
]

// —————————————————————————————————————————————————————————————————————————————
// Execute Query

async function main() {
   db.$transaction([
      db.$executeRaw`TRUNCATE TABLE Account CASCADE;`,
      db.account.createMany({ data: accounts }),
      db.party.createMany({ data: parties }),
      db.attendance.createMany({ data: attendance }),
   ]).catch(err => console.log("Seed error: ", err))
}

main()
   .then(async () => db.$disconnect())
   .catch(async (e) => {
      console.error("Seed error: ", e)
      await db.$disconnect()
      process.exit(1)
   })
