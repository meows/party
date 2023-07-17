import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { hour, randomString } from "~/lib/utility"

export const authRouter = createTRPCRouter({
   /** Check if you have good auth cookies. */
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
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(async ({ ctx, input: { email, password } }) => {
         const hash = await ctx.bcrypt.hash(password, 10)
         const now = new Date()
         const result = await ctx.prisma.account
            .upsert({
               where: { email },
               create: {
                  email,
                  hash,
                  created: now,
                  updated: now,
                  name: "John Bob",
               },
               update: {},
            })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
                  cause: "Failure to create or retrieve account."
               })
            })

         if (result.created.getTime() === now.getTime()) console.log("New account: ", result)

         const token = randomString(32)
         const session = await ctx.prisma.session
            .create({
               data: {
                  token,
                  expiry: new Date(Date.now() + hour),
                  session_owner: result.id,
               },
            })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
                  cause: "Failure to create session."
               })
            })
            ctx.res.setHeader("Set-Cookie", `token=${token};`)
            return session
      }),
})