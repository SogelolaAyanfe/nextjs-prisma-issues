'use client'
import { trpc } from '@/modules/infrastructure/api/trpc/client'
import BlogCard from 'components/BlogCard'
import { useParams } from 'next/navigation'

export default function blogPost() {
    const { id } = useParams<{ id: string }>()

    const { data: post, isLoading, error } = trpc.posts.getPostsById.useQuery({ id })

    if (isLoading) return <p>Loading...</p>
    if (error || !post) return <p>Blog post not found.</p>

    return (
        <div className="pt-[90px]">
            <BlogCard
                id={post.id}
                key={post.id}
                title={post.title}
                date={new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                img={post.img}
                author={post.userEmail || 'Anonymous'}
                info={post.content}
            />
        </div>
        
    )
}
