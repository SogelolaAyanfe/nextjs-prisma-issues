import { trpc } from 'modules/infrastructure/api/trpc/client'
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type BlogCardProps = {
    title?: string
    img: string | StaticImageData
    date?: string
    author: string
    info: string
    id: string
}

export default function BlogCard({ title, date, img, author, info, id }: BlogCardProps) {
    const { data: session } = useSession()
    const { data: post } = trpc.posts.getPostsById.useQuery({ id })
    const canEdit = post.userEmail === session?.user?.email

    return (
        <div className="flex w-full flex-col items-center gap-[10px] p-[10px] pt-[60px]">
            <Link href="/" className="mr-auto flex pl-[70px] flex-row max-sm:pl-[0px]">
                <svg
                    className="h-[48px] w-[48px] text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                </svg>
                <p className = "pt-[12px] text-blue-600">Go back</p>
            </Link>
            <div className="max-w-[800px] pb-[20px] text-center text-[35px] font-extrabold max-sm:text-[30px]">
                {title}
            </div>
            <div className="pb-[20px]">{date}</div>
            <div className="flex max-h-[700px] max-w-[900px] justify-center">
                <Image src={img} alt="blog post image" width={900} height={700} />
            </div>
            <div className="flex max-w-[900px] flex-col items-start pt-[10px]">
                <p className="max-w-[400px] text-[13px] pb-[20px]">Author: {author}</p>
                {canEdit && (
                    <Link
                        href={`/blog/edit/${id}`}
                        className="flex flex-row pt-[10px] pb-[10px] text-blue-600 hover:text-blue-900"
                    >
                        <svg
                            className="h-[23px] w-[23px] text-blue-600 hover:text-blue-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.3"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                        </svg>
                        Edit Post
                    </Link>
                )}

                <div
                    className="prose pb-[50px]"
                    dangerouslySetInnerHTML={{ __html: info }} 
                />
            </div>
        </div>
    )
}
