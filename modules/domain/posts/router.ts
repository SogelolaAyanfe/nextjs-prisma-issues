import { auth } from 'auth'
import cloudinary from 'lib/cloudinary'
import { publicProcedure, router } from 'modules/infrastructure/api/trpc/server'
import { prisma } from 'modules/infrastructure/database/prisma-client/layers/prisma'
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

    deletePost: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const session = await auth()

            if (!session) {
                throw new Error('You are unauthorized')
            } else if (!session.user) {
                throw new Error('User not found')
            } else if (!session.user.email) {
                throw new Error('Email not found')
            }

            const post = await prisma.post.findUnique({
                where: { id: input.id },
            })
            if (!post) {
                throw new Error('Post not found')
            }
            if (post.userEmail !== session.user.email) {
                throw new Error('You cannot delete this post')
            }
            if (post.publicId) {
                await cloudinary.uploader.destroy(post.publicId, {
                    resource_type: 'image',
                })
            }
            await prisma.post.delete({
                where: { id: input.id },
            })
            return { success: true, message: 'Post deleted successfully' }
        }),

    editPost: publicProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
                description: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const session = await await auth()
            if (!session?.user.email) {
                throw new Error('You must be logged in to edit a post')
            }
            const post = await prisma.post.findUnique({
                where: { id: input.id },
            })
            if (!post) {
                throw new Error('Post not found')
            }
            if (post.userEmail !== session.user.email) {
                throw new Error('You can only edit your own posts')
            }
            await prisma.post.update({
                where: { id: input.id },
                data: {
                    title: input.title,
                    content: input.content,
                    description: input.description,
                },
            })
            return { success: true, message: 'Post Updated successfully' }
        }),
})
