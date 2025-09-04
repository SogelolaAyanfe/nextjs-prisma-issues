import { initTRPC } from '@trpc/server'

//initialize tRPC
const trpc = initTRPC.create()

export const router = trpc.router 


export const publicProcedure = trpc.procedure
