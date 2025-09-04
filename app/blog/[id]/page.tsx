'use client'
import BlogCard from 'components/BlogCard'
import { trpc } from 'modules/infrastructure/api/trpc/client'
import { useParams } from 'next/navigation'

export default function BlogPost() {
    const { id } = useParams<{ id: string }>()

    const { data: post } = trpc.posts.getPostsById.useQuery({ id })

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
