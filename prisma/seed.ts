import { PrismaClient, party, attendance, session } from "@prisma/client"
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
      banner: "/party/banner.jpg",
      host: 2,
      time_start: new Date(),
      state: "CA",
      city: "San Francisco",
      zip: "94103",
      street: "1 Fake Street",
      unit: "Apt 1",
      longitude: 37.7749,
      latitude: -122.4194,
   },
   {
      id: 2,
      party_name: "Generative AI Party",
      banner: "/party/banner.jpg",
      host: 5,
      time_start: new Date(),
      state: "CA",
      city: "Los Angeles",
      zip: "90001",
      street: "2 Fake Street",
      longitude: 34.0522,
      latitude: -118.2437,
   }
]

const attendance = [
   { party_id: 1, guest_id: 1, },
   { party_id: 1, guest_id: 2, },
   { party_id: 1, guest_id: 4, },
   { party_id: 2, guest_id: 1, },
   { party_id: 2, guest_id: 2, },
   { party_id: 2, guest_id: 3, },
   { party_id: 2, guest_id: 4, },
]

const sessions:session[] = [
   {
      session_owner: 1,
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      token: "token",
   }
]

// —————————————————————————————————————————————————————————————————————————————
// Execute Query

async function main() {
   db.$transaction([
      db.$executeRaw`TRUNCATE TABLE Account CASCADE;`,
      db.account.createMany({ data: accounts }),
      db.party.createMany({ data: parties }),
      db.attendance.createMany({ data: attendance }),
      db.session.createMany({ data: sessions }),
   ]).catch(err => console.log("Seed error: ", err))
}

main()
   .then(async () => db.$disconnect())
   .catch(async (e) => {
      console.error("Seed error: ", e)
      await db.$disconnect()
      process.exit(1)
   })
