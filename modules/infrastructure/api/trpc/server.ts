import { initTRPC } from '@trpc/server'

import { PrismaClient } from "@prisma/client";

//initialize tRPC
const trpc = initTRPC.create()

//Create a Prisma Client
export const prisma = new PrismaClient();

export const router = trpc.router 


export const publicProcedure = trpc.procedure
