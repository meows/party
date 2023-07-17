import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { randomString } from "~/lib/utility"
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
      .mutation(async ({ ctx, input: { email, password } }) => {
         const hash = await ctx.bcrypt.hash(password, 10)
         const now = new Date()
         const result = await ctx.prisma.account
            .upsert({
               where: { email },
               create: {
                  email,
                  hash,
                  name: "John Bob",
                  created: now,
                  updated: now,
               },
               update: {},
            })
            .catch(message => {
               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message })
            })

         if (result.created.getTime() === now.getTime()) console.log("New account: ", result)

         const token = randomString(32)
         const session = await ctx.prisma.session
            .create({
               data: {
                  token,
                  expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  session_owner: result.id,
               },
            })
            .catch(message => {
               throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message })
            })
            ctx.res.setHeader("Set-Cookie", `token=${token};`)
            return session
      }),
})

// with
//     new_rows(name, password) as (values
//         ('alex', 'wwwwww'),
//         ('potato', 'potatopw'),
//         ('bee', 'bah')
//     ),
//     existing_user_lookup as (
//         select
//             users.name,
//             users.password as old_pw,
//             new_rows.password as new_pw
//         from
//             new_rows join users on new_rows.name = users.name
//     ),
//     same_name_wrong_pw as (
//         select
//             name,
//             'wrong password' as status
//         from
//             existing_user_lookup
//         where
//             old_pw <> new_pw
//     ),
//     same_name_same_pw as (
//         select
//             name,
//             'correct password' as status
//         from
//             existing_user_lookup
//         where
//             old_pw = new_pw
//     ),
//     actually_inserted as (
//         insert into users
//             select * from new_rows where name not in (select name from existing_user_lookup)
//         returning
//             name,
//             'created' as status
//     )
// select * from same_name_wrong_pw
// union all
// select * from same_name_same_pw
// union all
// select * from actually_inserted;

// const result = await ctx.prisma.account
//    .upsert({
//       where: { email },
//       create: { email, hash: password, name: "John Bob" },
//       update: {},
//    })
//    .catch(message => {
//       throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message })
//    })