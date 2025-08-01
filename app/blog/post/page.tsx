"use client"
import { trpc } from "@/modules/infrastructure/api/trpc/client"
import { useState } from "react"
import { nanoid } from "nanoid"
export default function PostBlog() {
     const [title, setTitle] = useState('')
     const [description, setDescription] = useState('')
     const [content, setContent] = useState('')
     const [img, setImg] = useState('') 

     const createPost = trpc.users.createPost.useMutation()

     const handleSubmit = async (event) => {
         event.preventDefault()

        //  FIXME: why do you need this? don't let LLMs generate your code. Do the work yourself.
         const slug = title.toLowerCase().replace(/ /g, '-') + '-' + nanoid(6)

         createPost.mutate({
             title,
             description,
             content,
             // NOTE: Why is this a placeholder? what is the purpose of it? Also, do you know you can't upload images via trpc?
             img: img || '/placeholder.jpg', 
         })
     }

    return (
        <div className="flex w-full flex-col items-center gap-[30px] p-9 pt-[90px]">
            <h1 className="text-[35px] font-black">Post A blog</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-[100px] max-lg:flex-col max-lg:gap-[40px]">
                    <div className="flex flex-col gap-[20px] max-lg:items-center">
                        <h1 className="text-[20px] font-medium">
                            Add an image for your blog
                        </h1>
                        <label
                            htmlFor="imageUpload"
                            className="h-[300px] w-[300px] items-center rounded bg-neutral-700 px-4 py-2 pt-[50px] text-center text-[100px] font-semibold text-white hover:bg-neutral-800"
                        >
                            +
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            name="image"
                            accept="image/*"
                            className="hidden"
                            // NOTE: learn about image uploads. this is weird
                            onChange={e => {
                                setImg('/BlogPostsImg/injury.jpeg')
                            }}
                        />
                    </div>
                    <div className="flex max-w-[700px] min-w-[400px] flex-col gap-[20px] pt-[40px]">
                        <input
                            type="text"
                            placeholder="Title"
                            className="] h-[45px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="h-[45px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Content"
                            className="h-[300px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            onChange={e => setContent(e.target.value)}
                        ></textarea>
                        <button className="h-[30px] max-w-[100px] rounded-md bg-black text-white hover:bg-neutral-800">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
