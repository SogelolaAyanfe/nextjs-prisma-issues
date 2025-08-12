import { publicProcedure, prisma, router } from 'modules/infrastructure/api/trpc/server'
import { z } from 'zod'


export const postsRouter = router({
    getPosts: publicProcedure.query(async () => {
        return prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: { User: true },
        })
    }),
    getPostsById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return prisma.post.findUnique({
                where: { id: input.id },
                include: {
                    User: true,
                },
            })
        }),
})
