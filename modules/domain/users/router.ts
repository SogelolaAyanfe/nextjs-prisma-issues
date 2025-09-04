import { auth } from '@/auth'
import { publicProcedure, router } from 'modules/infrastructure/api/trpc/server'
import { prisma } from 'modules/infrastructure/database/prisma-client/layers/prisma'
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
                title: z.string().min(1, 'Title is required'),
                content: z.string().min(1, 'Content is required'),
                img: z.string().url('Please provide a valid image URL'),
                description: z.string().min(1, 'Description is required'),
                publicId: z.string().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            const session = await auth()

            return prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    img: input.img,
                    description: input.description,
                    updatedAt: new Date(),
                    userEmail: session.user.email,
                    publicId: input.publicId,
                },
            })
        }),
})
