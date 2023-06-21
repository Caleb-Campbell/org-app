import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db"

export const crowRouter = createTRPCRouter({
    getCrows: publicProcedure
    .input(z.object({
        userId: z.string()
    }))
    .query(({input}) => {
        return prisma.user.findUnique({
            where: {
                id: input.userId
            },
            include: {
                crows: true
            }
        })
    })


})
