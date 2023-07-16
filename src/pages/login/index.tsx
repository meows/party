import { useEffect, useState } from "react"
import { api } from "~/utils/api"

export default function Login() {
   const [email, setEmail] = useState("")
   const [pass, setPass] = useState("")

   async function onSubmit() {
      const client = api.useContext()
   }

   useEffect(() =>{
      
   })

   return (
      <section>
         <h1>Login</h1>
         <input
            type="text"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
         />
         <input
            type="password"
            placeholder="password"
            onChange={e => setPass(e.target.value)}
            value={pass}
         />
         <button onClick={onSubmit}>Submit</button>
      </section>
   )
}