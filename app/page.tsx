"use client"
import { trpc } from '@/modules/infrastructure/api/trpc/client'
import BlogItems from '../components/BlogItems'
import Navbar from '../components/Navbar'


export default function Home() {
    // const blog = [
    //     {
    //         id: 1,
    //         imgsrc: '/BlogPostsImg/injury.jpeg',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 2,
    //         imgsrc: '/BlogPostsImg/champs.jpeg',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 3,
    //         imgsrc: '/BlogPostsImg/f1.png',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 4,
    //         imgsrc: '/BlogPostsImg/hali.jpeg',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 5,
    //         imgsrc: '/BlogPostsImg/james.png',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 6,
    //         imgsrc: '/BlogPostsImg/oscars.jpg',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 7,
    //         imgsrc: '/BlogPostsImg/celtics.png',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    //     {
    //         id: 8,
    //         imgsrc: '/BlogPostsImg/nfl.jpeg',
    //         author: 'Loren ipsum',
    //         date: new Date().toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         }),
    //         title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //         info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
    //     },
    // ]
    const { data: blogPosts, isLoading, isError, error } = trpc.posts.getPosts.useQuery()

    // if (isLoading) return <p>Loading...</p>
    // if (isError) return <p>Error: {error.message}</p>
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
                <div className="flex justify-center pt-[30px] pb-[30px]">
                    <h1 className="text-[40px] font-bold">LATEST STORIES</h1>
                </div>
                <div className="grid grid-cols-3 place-items-center p-4">
                    {blogPosts?.map(post => (
                        <BlogItems
                            key={post.id}
                            imgsrc={post.img}
                            createdAt={new Date(post.createdAt).toLocaleDateString()}
                            authorName={post.User?.name ?? 'Unknown Author'}
                            title={post.title}
                            description={post.description}
                            id={post.id}
                        />
                    ))}
                </div>
            </main>
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
