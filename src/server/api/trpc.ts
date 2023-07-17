import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { initTRPC, TRPCError } from "@trpc/server"
import { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { ZodError } from "zod"
import { prisma } from "~/server/db"
import bcrypt from "bcryptjs"

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
   session: {
      account: string
      token: string
   }
   req: NextApiRequest
   res: NextApiResponse
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
   return {
      req: opts.req,
      res: opts.res,
      prisma,
      bcrypt,
   }
}

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => 
   createInnerTRPCContext({
      session: { 
         account: opts.req.cookies.account ?? "",
         token: opts.req.cookies.token ?? "",
      },
      req: opts.req,
      res: opts.res,
   })

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
   transformer: superjson,
   errorFormatter({ shape, error }) {
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError:
               error.cause instanceof ZodError ? error.cause.flatten() : null,
         },
      }
   },
})

const enforceAuth = t.middleware(async ({ ctx, next }) => {
   const account = ctx.req.cookies.account ?? ""
   const token = ctx.req.cookies.token ?? ""
   if (!account || !token) throw new TRPCError({ code: "UNAUTHORIZED" })
   const session = ctx.prisma.session.findUnique({ where: { token } })
   if (!session) throw new TRPCError({ code: "UNAUTHORIZED" })
   return next({
      ctx: {
         session: { account, token },
      },
   })
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceAuth)
