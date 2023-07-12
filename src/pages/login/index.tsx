export default function Login() {
   return <section>
      <h1>Login</h1>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button>Submit</button>
   </section>
}


// import { z } from 'zod';
// import { trpc } from 'path/to/your/trpc'; // Import your trpc instance
// import { api } from "~/utils/api"

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