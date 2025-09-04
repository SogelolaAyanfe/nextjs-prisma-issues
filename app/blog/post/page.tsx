'use client'

import TipTap from 'components/TiipTap'
import { trpc } from 'modules/infrastructure/api/trpc/client'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PostBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [publicId, setPublicId] = useState('')

    const utils = trpc.useUtils()
    const router = useRouter()

    const createPost = trpc.users.createPost.useMutation({
        onSuccess: () => {
            ;(utils.posts.getPosts.invalidate(), router.push('/'))
        },
        onError: err => {
            console.error('❌ Error creating post:', err)
        },
    })

    const handleSubmit = async event => {
        event.preventDefault()
        await createPost.mutate({
            title,
            description,
            content,
            img: imageUrl,
            publicId: publicId,
        })
    }

    const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
        const info = result.info as object
        if ('public_id' in info && 'secure_url' in info) {
            const url = info.secure_url as string
            const publicId = info.public_id as string
            setImageUrl(url)
            setPublicId(publicId)
        }
    }

    return (
        <div className="flex flex-col items-center gap-[30px] p-9 pt-[90px]">
            <h1 className="text-[35px] font-black">Make a Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-[100px] max-lg:flex-col max-lg:gap-[40px]">
                    <div className="flex flex-col gap-[20px] max-lg:items-center">
                        <h1 className="text-[20px] font-medium">
                            Add an image for your blog
                        </h1>

                        <CldUploadButton
                            uploadPreset="imgupload"
                            onSuccess={handleImageUpload}
                            className={`relative h-[300px] w-[300px] items-center rounded-md border-[2px] px-4 py-2 text-center text-[100px] font-semibold text-black ${imageUrl && 'pointer-events-none'}`}
                        >
                            <div className="hover:text-neutral-600">+</div>
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    fill
                                    alt={title}
                                    className="absolute inset-0 object-cover"
                                />
                            )}
                        </CldUploadButton>
                    </div>
                    <div className="flex max-w-[700px] min-w-[400px] flex-col gap-[20px] pt-[40px] max-lg:w-[900px] max-lg:items-center max-sm:w-[350px] max-sm:items-center">
                        <input
                            type="text"
                            placeholder="Title"
                            className="h-[50px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black max-lg:w-[900px] max-lg:items-center max-sm:w-[300px] max-sm:min-w-[290px]"
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="h-[50px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black max-lg:w-[900px] max-lg:items-center max-sm:w-[300px] max-sm:min-w-[290px]"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TipTap content={content} onChange={setContent} />
                        {/* <textarea
                            placeholder="Content"
                            className="h-[300px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            onChange={e => setContent(e.target.value)}
                        ></textarea> */}
                        <button
                            onClick={e => {
                                e.preventDefault()
                                createPost.mutate({
                                    title,
                                    description,
                                    content,
                                    img: imageUrl,
                                })
                            }}
                            disabled={createPost.isPending}
                            className="rounded bg-black px-4 py-2 text-white hover:bg-neutral-600 max-lg:w-[200px] max-lg:items-center max-sm:w-[300px] max-sm:min-w-[200px]"
                        >
                            {createPost.isPending ? 'Posting...' : 'Post Blog'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
