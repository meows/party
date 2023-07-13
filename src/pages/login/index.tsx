import { useState } from "react"
import { Button } from "shadcn/components/ui/Button"
import { Input } from "shadcn/components/ui/Input"
import { api, setToken } from "~/utils/api"

export default function Login() {
   const [emailOrPhone, setEmailOrPhone] = useState("")
   const [password, setPassword] = useState("")

   // const query = api.auth.loginWithEmail.useQuery({
   //    email: emailOrPhone,
   //    password: password
   // })

   const { mutate: loginWithEmail, isLoading } =
      api.auth.loginWithEmail.useMutation({
         // accessToken is what we return from the loginWithEmail mutate function.
         onSuccess: ({ accessToken }) => {
            console.log(accessToken)
            setToken(accessToken)
         },
      })

   const handelSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      loginWithEmail({ email: emailOrPhone, password: password })
   }

   return (
      <section>
         <h1>Login</h1>
         <form onSubmit={handelSubmit}>
            <Input
               name="login-form"
               type="email"
               placeholder="email"
               onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <Input
               type="password"
               placeholder="password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={emailOrPhone.length == 0 || isLoading}>
               Submit
            </Button>
         </form>
      </section>
   )
}

// import { z } from 'zod';
// import { trpc } from 'path/to/your/trpc'; // Import your trpc instance

// import { useState } from 'react';
// const loginOrSignUp = api.auth.
// const loginOrSignUp = trpc.mutation('auth.loginOrSignUp', async ({ input }) => {
//   // Perform the login or sign up logic
//   const { emailOrPhone, password } = input;

//   if (!emailOrPhone) {
//     throw new Error('Email or phone number is required.');
//   }

//   // Determine whether the value is an email or phone number
//   const isEmail = emailOrPhone.includes('@');
//   const isPhone = /^\d{10}$/.test(emailOrPhone);
//   // Check if isPhone is 10 digits. TODO: check the country code (+1)?

//   if (!isEmail && !isPhone) {
//     throw new Error('Invalid email or phone number.');
//   }

//   // Continue with the login or sign up logic

//   return 'hello';
// });

// const Login: React.FC = () => {
//   const [formValue, setFormValue] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const result = await loginOrSignUp.mutateAsync({
//         emailOrPhone: formValue,
//         password: 'password', // Replace with the actual form data
//       });

//       // Handle the success response
//     } catch (error) {
//       // Handle the error
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue(event.target.value);
//   };

//   // Rest of your component code...
// };
