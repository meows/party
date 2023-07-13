import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { env } from '~/env.mjs'

// Function to generate a JWT token.
const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, env.JSONWEBTOKEN_SECRET, {
    expiresIn: '1h', // Token expiration time
  });

  return token;
};
/*
// Usage example
const token = generateToken('user123');
console.log(token);
*/

// Serialize function to convert token to cookie.
const serialize = (name: string, value: string, options: Record<string, any>): string => {
   const cookieParts = [`${name}=${encodeURIComponent(value)}`];
 
   for (const [key, val] of Object.entries(options)) {
     if (val !== false) {
       cookieParts.push(`${key}=${val}`);
     }
   }
 
   return cookieParts.join('; ');
 };

// Usage example
/*
const cookie = serialize('token', 'your-token-value', {
   httpOnly: true,
   secure: true,
   sameSite: 'lax',
   maxAge: 3600,
   path: '/',
 });
 */

export const authRouter = createTRPCRouter({
   isAuth: protectedProcedure
      .query(async ({ ctx }) => {
         const result = await ctx.prisma.session
            .findUnique({
               where: { 
                  token: ctx.session.token, 
               },
            })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),
   /** Login with email with optional password. */
   loginWithEmail: publicProcedure
      .input(z.object({
         email: z.string(),
         password: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
         const { email, password } = input
         const account = await ctx.prisma.account.findFirst({
            where: {
               OR: [
                 { email: email },
                 { phone: email },
               ],
             },
         })
         if (!account) {
            throw new TRPCError({
               code: "UNAUTHORIZED",
               message: "Invalid email.",
               // message: "Invalid email or password.",
            });
         }
         if (password) {
            // const candidate = await bcrypt.hash(password, 10)
            // const isPasswordValid = await bcrypt.compare(candidate, account.hash);
            const isPasswordValid = password === account.hash;
            if (!isPasswordValid) {
               throw new TRPCError({
                 code: "UNAUTHORIZED",
                 message: "Invalid password.",
               });
            }

            // From here the account is good.

            // Generate the token.
            const token = generateToken(account.id.toString());

            // Set the token as a cookie
            const cookie = serialize('token', token, {
               httpOnly: true,
               secure: true,
               sameSite: 'lax',
               maxAge: 3600,
               path: '/',
            });
            ctx.res.setHeader('Set-Cookie', cookie);

            // Redirect response to URL '/'
            ctx.res.setHeader('Location', '/');
            // Set the appropriate status code for redirection
            ctx.res.statusCode = 302;

            return { accessToken: token }
         } else {
            // Send verification email.
            // User provided only email/phone, send verification link
            if (account.email) {
               // Send verification email
               // await sendVerificationEmail(account.email);
            } else if (account.phone) {
               // Send verification SMS
               // await sendVerificationSMS(account.phone);
            }
            return { accessToken: ""}
         }
      }),
   /** Gives you a valid session cookie. */
   giveMeTheCookie: publicProcedure
      .query(async ({ ctx }) => {

      }),
   loginWithPhone: publicProcedure
      .input(z.object({
         phone: z.string(),
         password: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
         const { phone, password } = input
         let username;

      }),
   SignUpWithEmail: publicProcedure
      .input(z.object({
         email: z.string(),
         password: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
         const { email, password } = input
            
         return "hi"
      }),
   SignUpWithPhone: publicProcedure
      .input(z.object({
         phone: z.string().optional(),
         password: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
         const { phone, password } = input
      })
})
