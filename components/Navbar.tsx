'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()
    const [color, setColor] = useState(false)
    const [home, setHome] = useState('/')

    useEffect(() => {
        setHome(pathname)
    }, [pathname])

    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeColor)
    }, [])

    const homeBackground = color ? 'bg-black bg-opacity-70' : 'bg-transparent'
    const otherBackground = color ? 'bg-black bg-opacity-75' : 'bg-black'

    return (
        <div>
            <div
                className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-6 text-white transition-all duration-300 ${
                    home === '/' ? homeBackground : otherBackground
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
                    <Link href="/blog/post">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Post A Blog
                        </span>
                    </Link>
                    <Link href="/signUp">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Sign Out
                        </span>
                    </Link>
                    <Link href="/signIn">
                        <span className="border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white">
                            Sign in
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
        </div>
    )
}
