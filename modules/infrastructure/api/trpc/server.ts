import { initTRPC } from '@trpc/server'

import { PrismaClient } from "@prisma/client";

//initialize tRPC
const trpc = initTRPC.create()

//Create a Prisma Client
// FIXME: this should move out to it's own file. name it prisma.ts
export const prisma = new PrismaClient();

export const router = trpc.router 


export const publicProcedure = trpc.procedure
