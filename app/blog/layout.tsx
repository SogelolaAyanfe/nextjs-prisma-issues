'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// TODO: Drop this file show navbar component in root layout
export default function Layout({ children }: any) {
    // TODO: Move this to the Navbar component
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50 // Triggers after 50px scroll
            setScrolled(isScrolled)
        }
        // Add scroll listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div>
            {/* TODO: Move this to the Navbar component */}
            <header
                className={`fixed top-0 right-0 left-0 z-50 flex w-full justify-between bg-black bg-cover p-6 text-white ${
                    scrolled ? 'bg-opacity-70 bg-black' : 'bg-black'
                }`}
            >
                <div className="text-[25px]">Blogged.</div>
                <div className="hidden flex-row items-center gap-[30px] hover:border-b-white sm:flex">
                    <Link href="/">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Home
                        </span>
                    </Link>
                    <Link href="/blog/post">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Post A Blog
                        </span>
                    </Link>
                    <Link href="/signUp">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Sign Up
                        </span>
                    </Link>

                    <Link href="/signIn">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Log in
                        </span>
                    </Link>
                </div>
                <button
                    className="relative z-50 sm:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        // Show X when menu is open
                        <span className="text-3xl">×</span>
                    ) : (
                        // Show hamburger when menu is closed
                        <div className="flex flex-col gap-1">
                            <div className="h-0.5 w-6 bg-white"></div>
                            <div className="h-0.5 w-6 bg-white"></div>
                            <div className="h-0.5 w-6 bg-white"></div>
                        </div>
                    )}
                </button>
                {menuOpen && (
                    <div className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black md:hidden">
                        <div className="flex flex-col gap-8 text-center text-2xl">
                            <Link href="/" onClick={() => setMenuOpen(false)}>
                                <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                    Home
                                </span>
                            </Link>
                            <Link href="/PostBlog" onClick={() => setMenuOpen(false)}>
                                <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                    Post A Blog
                                </span>
                            </Link>
                            <Link href="/signUp" onClick={() => setMenuOpen(false)}>
                                <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                    Sign Up
                                </span>
                            </Link>
                            <Link href="/signIn" onClick={() => setMenuOpen(false)}>
                                <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                    Log in
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </header>
            <main>{children}</main>
        </div>
    )
}
