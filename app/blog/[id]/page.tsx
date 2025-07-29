'use client'

// update path as needed
import { trpc } from '@/modules/infrastructure/api/trpc/client'
import BlogCard from 'components/BlogCard'
import { useParams } from 'next/navigation'

export default function blogPost() {
    const { id } = useParams()
    let postId = ''

    if (typeof id === 'string') {
        postId = id
    } else if (Array.isArray(id)) {
        postId = id[0]
    } else {
        postId = ''
    }

    const {
        data: post,
        isLoading,
        error,
    } = trpc.users.getPostsById.useQuery({ id: postId })

    if (isLoading) return <p>Loading...</p>
    if (error || !post) return <p>Blog post not found.</p>

    return (
        <div className="pt-[90px]">
            <BlogCard
                key={post.id}
                title={post.title}
                date={new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                imgsrc={post.img}
                author={post.User?.name || 'Anonymous'}
                info={post.content}
            />
        </div>
    )
}
