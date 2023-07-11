import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const partyRouter = createTRPCRouter({
   getPartiesByHost: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.party
            .findMany({ where: { host_id: input, } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
      }),
   getPartiesByGuest: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
         const result = await ctx.prisma.attendance
            .findMany({ where: { guest: input, } })
            .catch(message => {
               throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message,
               })
            })
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
      }),

   makeParty: protectedProcedure
      .input(z.object({
         party_name: z.string(),
         host_id: z.number(),
         banner_image: z.any().refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Error: only .jpeg, .jpg, and .png types are accepted"
            ),
         time_start: z.string(),
         time_end: z.string().optional(),
         is_waitlist: z.boolean(),
         // unknown since it is a string in the form of json?
         widgets: z.string().optional(),
         state: z.string(),
         city: z.string(),
         zip: z.string(),
         street: z.string(),
         unit: z.string().optional(),
         longitude: z.number(),
         latitude: z.number(),
         plus_code: z.string().optional(),
         }))
         .query(async ({ ctx, input }) => {
            const result = await ctx.prisma.party.create({
               data: {
                  party_name: input.party_name,
                  host_id: input.host_id,
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
                  plus_code: input.plus_code && undefined,
               },
            })

         return {
            party: result,
         }
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

   // editPartyHost: protectedProcedure
   //    .input(
   //       z.object({
   //          id: z.number(),
   //          host: z.number(),
   //          hostid: z.number(),
   //          chatid: z.string(),
   //       })
   //    )
   //    .query(async ({ ctx, input }) => {
   //       const result = await ctx.prisma.party.update({
   //          where: {
   //             id: input.id,
   //          },
   //          data: {
   //             host: input.host,
   //             hostid: input.hostid,
   //             chatid: input.chatid,
   //          },
   //       })

   //       return {
   //          party: result,
   //       }
   //    }),

   editPartyImage: protectedProcedure
      .input(
         z.object({
            id: z.number(),
            banner_image: z
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
               banner_image: input.banner_image,
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
    return ctx.prisma.party.findMany();
  }),


});
