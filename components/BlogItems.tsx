import { trpc } from '@/modules/infrastructure/api/trpc/client'
import { useSession } from 'next-auth/react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type BlogItemProps = {
    imgsrc: string | StaticImageData
    createdAt?: string
    author: string
    title?: string
    description: string
    id: string
}

export default function BlogItems({
    imgsrc,
    createdAt,
    author,
    title,
    description,
    id,
}: BlogItemProps) {
    const { data: session, status } = useSession()
    const utils = trpc.useUtils()
    const { data: post, isLoading, error } = trpc.posts.getPostsById.useQuery({ id })
    const canDelete = post?.userEmail === session?.user?.email
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deletePost = trpc.posts.deletePost.useMutation({
        onSuccess: () => {
            utils.posts.getPosts.invalidate()
            setShowDeleteModal(false)
        },
        onError: err => {
            console.error('❌ Error deleting post:', err)
            setShowDeleteModal(false)
        },
    })

    const handleDeleteClick = () => {
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        deletePost.mutate({ id })
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
    }

    return (
        <>
            <div className="flex h-[500px] w-[400px] max-w-[350px] flex-col gap-[10px] rounded-xl border-[5px] bg-white p-4 shadow-xl max-lg:w-[300px] max-md:w-[600px]">
                <div className="relative h-[250px] overflow-hidden">
                    <Link href={`/blog/${id}`}>
                        <Image
                            src={imgsrc}
                            alt="Blog post image"
                            fill
                            className="transform object-cover transition duration-300 ease-in-out hover:scale-110"
                        />
                    </Link>
                </div>
                <div className="flex flex-row gap-[10px] text-[13px]">
                    <p className="font-bold">{author}</p>
                    <p>({createdAt})</p>
                </div>
                {canDelete && (
                    <button onClick={handleDeleteClick}>
                        <svg
                            className="h-[34px] w-[34px] text-red-700 hover:text-black dark:text-white"
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
                                strokeWidth="1.5"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                            />
                        </svg>
                    </button>
                )}

                <p className="text-black-900 h-[125px] text-[17px] font-extrabold">
                    {title}
                </p>

                <div className="h-[100px] max-w-[400px] flex-row pt-[20px] pb-[20px]">
                    <p>[{description}]</p>
                    <Link
                        href={`/blog/${id}`}
                        className="text-[14px] text-blue-600 transition duration-1000 ease-in-out hover:underline"
                    >
                        See more
                    </Link>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center">
                            <svg
                                className="mr-3 h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete Blog Post
                            </h3>
                        </div>

                        <p className="mb-6 text-gray-600">
                            Are you sure you want to delete this post? This action cannot
                            be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-300"
                                disabled={deletePost.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={deletePost.isPending}
                            >
                                {deletePost.isPending ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Deleting...
                                    </div>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
