import { useState } from "react"
import { api, client } from "~/utils/api"

export default function Login() {
   const [email, setEmail] = useState("")
   const [pass, setPass] = useState("")

   const handleSubmit = async () => {
      const res = await client.auth.loginOrRegister.query({
         email,
         password: pass
      })
      console.log(res)
   }

   return (
      <section className="flex flex-col items-center justify-center h-screen">
         <div className="flex flex-col items-center justify-center w-96">
            <h1 className="text-4xl font-bold mb-1">Login or Register</h1>
            <input
               className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md"
               type="email"
               placeholder="Email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
            <input
               className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md"
               type="password"
               placeholder="Password"
               value={pass}
               onChange={e => setPass(e.target.value)}
            />
            <button
               className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
               onClick={handleSubmit}
            >
               Submit
            </button>
         </div>
      </section>
   )
}