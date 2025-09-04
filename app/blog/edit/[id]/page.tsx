'use client'
import EditTiptap from '@/components/EditTipTap'
import { trpc } from '@/modules/infrastructure/api/trpc/client'
import TipTap from 'components/TiipTap'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPostPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const { data: post} = trpc.posts.getPostsById.useQuery(
        {
            id,
        },
        { enabled: !!id },
    )

    const updatePost = trpc.posts.editPost.useMutation({
        onSuccess: () => router.push('/'),
        onError: err => {
            console.error('❌ Error updating post:', err)
        },
    })

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setDescription(post.description)
            setContent(post.content || '')
        }
    }, [post])

    return (
        <form
            className="flex flex-col justify-center items-center gap-[30px] p-9 pt-[90px]"
            onSubmit={e => {
                e.preventDefault()
                updatePost.mutate({ id, title, description, content })
            }}
        >
            <div className="flex w-full max-w-[900px] flex-col items-center justify-center gap-[20px] pt-[40px] lg:min-w-[400px]">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    className="h-[45px] w-full max-w-[900px] rounded-md border-[2px] border-black pl-[5px] placeholder-black lg:min-w-[400px] sm:max-w-[500px] sm:min-w-[290px]"
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    className="h-[45px] w-full max-w-[900px] rounded-md border-[2px] border-black pl-[5px] placeholder-black lg:min-w-[400px] sm:max-w-[500px] sm:min-w-[290px]"
                    onChange={e => setDescription(e.target.value)}
                />
                <EditTiptap content={content} onChange={setContent} id={id} />
                <button
                    type="submit"
                    disabled={updatePost.isPending}
                    className="w-full max-w-[300px] self-center rounded-lg bg-black px-4 py-2 text-white hover:bg-neutral-600 lg:w-[200px] sm:w-[200px]"
                >
                    {updatePost.isPending ? 'Posting...' : 'Post Blog'}
                </button>
            </div>
        </form>
    )
}