import { TRPCError } from "@trpc/server"
import { z } from "zod"
import {
   createTRPCRouter,
   publicProcedure,
   protectedProcedure,
} from "~/server/api/trpc"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const partyRouter = createTRPCRouter({
   getPartiesByHost: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party
            .findMany({ where: { host: input } })
            .catch((message) => {
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
            .findMany({ where: { guest_id: input } })
            .catch((message) => {
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
            .findMany({ where: { city: input } })
            .catch((message) => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
         return result
      }),

   makeParty: publicProcedure
      .input(
         z.object({
            name: z.string(),
            host: z.number(),
            banner: z.string().optional(),
            // banner: z.any().refine(
            //    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            //    "Error: only .jpeg, .jpg, and .png types are accepted"
            //    ),
            time_start: z.string(),
            time_end: z.string().optional(),
            is_waitlist: z.boolean(),
            // unknown since it is a string in the form of json?
            widgets: z.string().optional(),
            chat_id: z.string().optional(),
            state: z.string(),
            city: z.string(),
            zip: z.string(),
            street: z.string(),
            unit: z.string().optional(),
            longitude: z.number(),
            latitude: z.number(),
         })
      )
      .mutation(async ({ ctx, input }) => {
         // TODO: if cookies exist then perform procedure
         // if not, then redirect to login page PLUS information on current page
         // then we can redirect back to the original place
         const result = await ctx.prisma.party.create({
            data: {
               party_name: input.name,
               host: input.host,
               time_start: input.time_start,
               // Pass `time_end` if provided, otherwise `undefined`
               time_end: input.time_end ?? undefined,
               is_waitlist: input.is_waitlist,
               // Pass `widgets` if provided, otherwise `undefined`
               widgets: input.widgets && undefined,
               state: input.state,
               city: input.city,
               zip: input.zip,
               street: input.street,
               unit: input.unit && undefined,
               longitude: input.longitude,
               latitude: input.latitude,
            },
         })

         return result
      }),

   editPartyName: protectedProcedure
      .input(
         z.object({
            id: z.number(),
            name: z.string(),
         })
      )
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party.update({
            where: {
               id: input.id,
            },
            data: {
               party_name: input.name,
            },
         })

         return {
            party: result,
         }
      }),

   editPartyImage: protectedProcedure
      .input(
         z.object({
            id: z.number(),
            banner: z
               .any()
               .refine(
                  (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                  "Error: only .jpeg, .jpg, and .png types are accepted"
               ),
         })
      )
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party.update({
            where: {
               id: input.id,
            },
            data: {
               banner: input.banner,
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
            .catch((message) => {
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
