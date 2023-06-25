import type { account } from "@prisma/client"
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
      host_id: "meow_host_id",
      host_email: "meow@meow.com",
      host_phone: "12345678",

      hash: "example_hash",
      about: "hi",
   },
   {
      id: 2,
      host_id: "moo_host_id",
      name: "Moo",
      email: "moo@moo.com",
      phone: "0001112222",
      host_email: "moo@moo.com",
      host_phone: "0001112222",

      hash: "example_hash_moo",
      about: "hi this is moo",
      is_host: true,
   },
   {
      id: 3,
      host_id: "bark_host_id",
      name: "Bark",
      email: "bark@bark.com",
      phone: "0000000001",
      host_email: "bark@bark.com",
      host_phone: "0000000001",

      hash: "example_hash_bark",
      about: "hi this is bark",
      is_host: false,
   },
   {
      id: 4,
      host_id: "woof_host_id",
      name: "Woof",
      email: "woof@woof.com",
      phone: "0000000002",
      host_email: "woof@woof.com",
      host_phone: "0000000002",
      hash: "example_hash_woof",
      about: "hi this is woof",
      is_host: false,
   },

]

const parties = [
   {
      id: 1,
      party_name: "Hack Night Party",
      banner_image: "/public/party/hack-night-party/banner.jpg",
      host_id: 2,

      time_start: new Date(),

      state: "CA",
      city: "San Francisco",
      zip: "94103",
      street_number: "123",
      street: "Fake Street",
      unit: "Apt 1",
      longitude: 37.7749,
      latitude: -122.4194,
      plus_code: "849VQH8R+R9",
      widgets: JSON.stringify({}),
   }
]

const attendance = [
   {
      party: 1,
      guest: 1,
   },
   {
      party: 1,
      guest: 2,
   },
   {
      party: 1,
      guest: 4,
   },
]

// —————————————————————————————————————————————————————————————————————————————
// Execute Query

async function main() {
   db.account
      .createMany({ data: accounts })
      .catch((e) => console.error("Error creating accounts: ", e))
   
   db.party
      .createMany({ data: parties })
      .catch((e) => console.error("Error creating parties: ", e))

   db.attendance
      .createMany({ data: attendance })
      .catch((e) => console.error("Error creating attendance: ", e))
}

main()
   .then(async () => db.$disconnect())
   .catch(async (e) => {
      console.error("Seed error: ", e)
      await db.$disconnect()
      process.exit(1)
   })