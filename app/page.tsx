'use client'
import { trpc } from '@/modules/infrastructure/api/trpc/client'
import Link from 'next/link'
import { useState } from 'react'
import BlogItems from '../components/BlogItems'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'

export default function Home() {
    const { data: blogPosts} = trpc.posts.getPosts.useQuery()
    const [hover, setHover] = useState(false)
    const mouseEnter = () => {
        setHover(true)
    }
    const mouseLeave = () => {
        setHover(false)
    }
    const {data: session, status} = useSession()
    const canSeeHover = status === 'authenticated'
    

    return (
        <>
            <header
                className="relative flex h-[500px] w-full flex-col bg-cover bg-no-repeat p-6 text-white"
                style={{
                    backgroundImage: "url('/hero.jpg')",
                    backgroundPosition: 'center 38%',
                }}
            ></header>
            <Navbar />
            <main>
                <div className="flex justify-center pt-[40px] pb-[30px]">
                    <h1 className="text-[40px] font-bold">LATEST STORIES</h1>
                </div>
                <div className="grid grid-cols-4 place-items-center gap-[50px] p-4 pb-[150px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:gap-[20px] max-md:grid-cols-1 max-sm:gap-[40px]">
                    {blogPosts?.map(post => (
                        <BlogItems
                            key={post.id}
                            imgsrc={post.img}
                            createdAt={new Date(post.createdAt).toLocaleDateString()}
                            author={post.userEmail || 'Unknown Author'}
                            title={post.title}
                            description={post.description}
                            id={post.id}
                        />
                    ))}
                </div>
            </main>
            {canSeeHover && (
            <div className="fixed right-[10px] bottom-5 hidden max-sm:block">
                <Link
                    href="/blog/post"
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                >
                    {hover && (
                        <p className="w-[50px] rounded-xl bg-green-600 pl-[8px] text-[13px] text-white transition duration-1000 ease-in-out">
                            Write
                        </p>
                    )}
                    <svg
                        className="h-[50px] w-[50px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        viewBox="0 0 48 48"
                    >
                        <circle cx="24" cy="24" r="21" fill="#4CAF50" />
                        <g fill="#fff">
                            <path d="M21 14h6v20h-6z" />
                            <path d="M14 21h20v6H14z" />
                        </g>
                    </svg>
                </Link>
            </div>)}
            <div className="absolute top-[280px] flex flex-col gap-0 text-white">
                <h1 className="border-white p-2 text-[25px] sm:text-[40px]">
                    The Dive: Explore every
                </h1>
                <h1 className="border-white p-2 text-[25px] sm:text-[40px]">
                    {`writer's deepest imagination.`}
                </h1>
            </div>
        </>
    )
}
