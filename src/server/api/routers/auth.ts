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
})
