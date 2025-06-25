'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
    // Track if mobile menu is open or closed
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
            <header
                className="relative flex h-[500px] w-full flex-col bg-cover bg-no-repeat p-6 text-white"
                style={{
                    backgroundImage: "url('/hero.jpg')",
                    backgroundPosition: 'center 38%',
                }}
            >
                {/* Top navigation bar */}
                <div
                    className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-6 transition-all duration-300 ${
                        scrolled ? 'bg-opacity-70 bg-black' : 'bg-transparent'
                    }`}
                >
                    <div className="text-[25px]">Blogged.</div>

                    {/* Desktop menu - hidden on mobile */}
                    <div className="hidden flex-row items-center gap-[30px] sm:flex">
                        <Link href="/">
                            <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                                Home
                            </span>
                        </Link>
                        <Link href="/PostBlog">
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

                    {/* Mobile hamburger button - only shows on mobile */}
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
                </div>

                {/* Mobile menu - only shows when menuOpen is true */}
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

                <div className="absolute top-[280px] flex flex-col gap-0">
                    <h1 className="border-white p-2 text-[25px] sm:text-[40px]">
                        The Dive: Explore every
                    </h1>
                    <h1 className="border-white p-2 text-[25px] sm:text-[40px]">
                        {`writer's deepest imagination.`}
                    </h1>
                </div>
            </header>
        </div>
    )
}
