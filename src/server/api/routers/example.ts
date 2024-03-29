import { z } from "zod"
import {
   createTRPCRouter,
   publicProcedure,
   protectedProcedure,
} from "~/server/api/trpc"

export const exampleRouter = createTRPCRouter({
   hello: publicProcedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
         return {
            greeting: `Hello ${input.name}`,
         }
      }),

   getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.party.findMany()
   }),

   getSecretMessage: protectedProcedure.query(() => {
      return "you can now see this secret message!"
   }),
})