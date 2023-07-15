import { TRPCError } from "@trpc/server"
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
      })
})
