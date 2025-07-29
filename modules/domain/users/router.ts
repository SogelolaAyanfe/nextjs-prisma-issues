import { prisma, publicProcedure, router } from 'modules/infrastructure/api/trpc/server'

import { z } from 'zod'

export const usersRouter = router({
    list: publicProcedure.query(() => {
        return [
            {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
            {
                id: '2',
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
            },
        ]
    }),
    createPost: publicProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                img: z.string(),
                description: z.string(),
                slug: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    img: input.img,
                    description: input.description,
                    slug: input.slug,
                    updatedAt: new Date(),
                },
            })
        }),
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
    getPostBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            return prisma.post.findUnique({
                where: { slug: input.slug },
            })
        }),
})
