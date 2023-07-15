import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const partyRouter = createTRPCRouter({
   getPartiesByHost: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party
            .findMany({ where: { host: input, } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),
   getPartiesByGuest: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.attendance
            .findMany({ where: { guest_id: input, } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),
   getPartiesByCity: protectedProcedure
      .input(z.string())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party
            .findMany({ where: { city: input, } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),

   makeParty: protectedProcedure
      .input(z.object({
         name: z.string(),
         host: z.number(),
         chat_id: z.string(),
         banner: z.any().refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Error: only .jpeg, .jpg, and .png types are accepted"
         ),
      }))
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party.create({
            data: {
               party_name: input.name,
               host: input.host,

            },
         })

         return {
            party: result,
         }
      }),
   deleteParty: protectedProcedure
      .input(z.number())
      .mutation(async ({ ctx, input }) => {
         const result = await ctx.prisma.party
            .update({ where: { id: input }, data: { is_deleted: true } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),

   getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.party.findMany()
   }),
})
