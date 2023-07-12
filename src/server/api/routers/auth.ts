import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import bcrypt from "bcrypt"

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
      .query(async ({ ctx, input }) => {
         const { email, password } = input
         if (password) {
            const candidate = await bcrypt.hash(password, 10)
            const account = await ctx.prisma.account.findUnique({
               where: {
                  email
               },
            })
            if (!account) {
               throw new TRPCError({
                  code: "UNAUTHORIZED",
                  message: "Invalid email or password.",
               });
            }
            const isPasswordValid = await bcrypt.compare(candidate, account.hash);
            if (!isPasswordValid) {
               throw new TRPCError({
                 code: "UNAUTHORIZED",
                 message: "Invalid email or password.",
               });
            }
            // the account is good, figure out how to set cookie + redirect
            return
         } else {
            // Send verification email.
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
