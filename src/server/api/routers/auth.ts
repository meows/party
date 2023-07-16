import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

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
   giveCookie: publicProcedure
      .query(async ({ ctx }) => {
         ctx.res.setHeader("Set-Cookie", "token=hello;")
         return { message: "Cookie set" }
      }),
   authorizeUser: publicProcedure
      .input(z.object({
         email: z.string(),
         password: z.string(),
      }))
      .query(async ({ ctx, input }) => {

      }),
   registerUser: publicProcedure
      .input(z.object({
         email: z.string(),
         password: z.string(),
      }))
      .query(async ({ ctx, input }) => {
         const is_user_unique = await ctx.prisma.account
            .findFirst({ where: { email: input.email } })
            .catch(message => {
               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message })
            })
         if (is_user_unique) {
            throw new TRPCError({
               code: "CONFLICT",
               message: "User already exists",
            })
         }
      }),
   /**
    * If no password is present:
    *    - Known user will receive a login link.
    *    - Unknown user will receive a registration link.
    *
    * If password is present:
    *   - Known user will have password checked & error if wrong.
    *   - Unknown user will receive a registration link.
    */
   loginOrRegister: publicProcedure
      .input(z.object({
         email: z.string(),
         password: z.string(), // require password for now before we get email
      }))
      .query(async ({ ctx, input: { email, password } }) => {
         const result = await ctx.prisma.account
            .upsert({
               where: { email },
               create: { email, hash: password, name: "John Bob" },
               update: {},
            })
            .catch(message => {
               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message })
            })
      }),
})