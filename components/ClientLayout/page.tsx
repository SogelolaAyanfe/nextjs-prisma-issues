'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <html lang="en">
            <body>
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
                                    <Link
                                        href="/PostBlog"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                            Post A Blog
                                        </span>
                                    </Link>
                                    <Link
                                        href="/signUp"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                            Sign Up
                                        </span>
                                    </Link>
                                    <Link
                                        href="/signIn"
                                        onClick={() => setMenuOpen(false)}
                                    >
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
                    <main>{children}</main>
                    <footer className="flex justify-around gap-[30px] bg-black p-20 text-white max-sm:flex-col-reverse max-sm:gap-[40px] max-sm:p-3">
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex max-w-[700px] flex-col gap-[20px]">
                                <p className="text-[25px]">Blogged.</p>
                                <p className="sm:max-w-[800px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Aenean bibendum eget justo eget blandit. Fusce
                                    vitae tempor turpis. Sed scelerisque elementum eros, a
                                    porta erat auctor sit amet. Mauris nec mi ornare ante
                                    hendrerit porta nec gravida nisl. Suspendisse vitae
                                    ligula consequat, tristique libero eu, facilisis quam.
                                </p>
                            </div>
                            <p> © 2025. All Rights Reserved.</p>
                        </div>
                        <div className="flex flex-row gap-[100px] max-sm:flex-col max-sm:gap-[40px] max-sm:pt-[30px]">
                            <div className="flex flex-col gap-[10px]">
                                <p>Others</p>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        Terms Of Service
                                    </span>
                                </Link>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        Privacy Policy
                                    </span>
                                </Link>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        Corporate
                                    </span>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <p>Socials</p>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        Facebook
                                    </span>
                                </Link>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        X
                                    </span>
                                </Link>
                                <Link href="/" className="text-neutral-500">
                                    <span className="transition duration-900 hover:text-white">
                                        Instagram
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}
