import { contextProps } from "@trpc/react-query/shared";
import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const partyRouter = createTRPCRouter({

    getParty : protectedProcedure
      .input(z.object({
        id : z.number()
      }))
      .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.findUnique({
          where: {
            id: input.id,
          }
        })

        return {
          party : result
        }
      }),

  makeParty: protectedProcedure
    .input(z.object({ 
        name: z.string(), 
        host: z.number(), 
        hostid: z.number(), 
        chatid: z.string(),
        bannerimage: z.any()
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                "Error: only .jpeg, .jpg, and .png types are accepted"
            )
    }))
    .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.create({
          data: {
            name : input.name,
            host : input.host,
            hostid : input.hostid,
            chatid : input.chatid,
            bannerimage : input.bannerimage
          }
        })

        return {
          party : result
        }
      }),

  editPartyName : protectedProcedure
      .input(z.object({
        id : z.number(),
        name: z.string()
      }))
      .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        })

        return {
          party : result
        }
      }),

  editPartyHost : protectedProcedure
      .input(z.object({
        id : z.number(),
        host : z.number(),
        hostid : z.number(),
        chatid : z.string()
      }))
      .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.update({
          where: {
            id: input.id,
          },
          data: {
            host: input.host,
            hostid: input.hostid,
            chatid: input.chatid
          },
        })

        return {
          party : result
        }
      }),

  editPartyImage : protectedProcedure
      .input(z.object({
        id : z.number(),
        bannerimage: z.any()
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Error: only .jpeg, .jpg, and .png types are accepted"
        )
      }))
      .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.update({
          where: {
            id: input.id,
          },
          data: {
            bannerimage: input.bannerimage,
          },
        })

        return {
          party : result
        }
      }),

  deleteParty : protectedProcedure
      .input(z.object({
        id : z.number()
      }))
      .query(async ({ ctx,input }) => {
        const result = await ctx.prisma.parties.delete({
          where: {
            id: input.id,
          }
        })

        return {
          result : result
        }
      }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.parties.findMany();
  }),


});
