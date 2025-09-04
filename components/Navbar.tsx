'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()
    const [color, setColor] = useState(false)
    const [home, setHome] = useState('/')
    const { data: session, status } = useSession()

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
        return () => window.removeEventListener('scroll', changeColor)
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

              
                <div className="hidden flex-row items-center gap-[30px] sm:flex">
                    <Link
                        href="/"
                        className="flex flex-row gap-[5px] border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white"
                    >
                        <svg
                            className="h-[23px] w-[20px] text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Home
                    </Link>

                    {status === 'authenticated' ? (
                        <div className="flex items-center gap-[30px]">
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="flex flex-row gap-[5px] border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white"
                            >
                                <svg
                                    className="h-[23px] w-[20px] text-white dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Log out
                            </button>
                            <Link
                                href="/blog/post"
                                className="flex flex-row gap-[5px] border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white"
                            >
                                <svg
                                    className="h-[23px] w-[20px] text-white dark:text-white"
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
                                        strokeWidth="1.3"
                                        d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                                    />
                                </svg>
                                Write
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link
                                href="/signIn"
                                className="flex flex-row gap-[5px] border-b-2 border-transparent transition duration-1000 ease-in-out hover:border-white"
                            >
                                <svg
                                    className="h-[23px] w-[20px] text-white dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Log in
                            </Link>
                        </div>
                    )}
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
                <div className="bg-opacity-95 fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black sm:hidden">
                    <div className="flex flex-col gap-8 text-center text-2xl text-white">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            <span className="flex items-center justify-center gap-2 border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                <svg
                                    className="h-[23px] w-[20px] text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Home
                            </span>
                        </Link>

                        {status === 'authenticated' ? (
                            <>
                                <Link
                                    href="/blog/post"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="flex items-center justify-center gap-2 border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                        <svg
                                            className="h-[23px] w-[20px] text-white"
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
                                                strokeWidth="1.3"
                                                d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                                            />
                                        </svg>
                                        Write
                                    </span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false)
                                        signOut({ callbackUrl: '/' })
                                    }}
                                    className="flex items-center justify-center gap-2 border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white"
                                >
                                    <svg
                                        className="h-[23px] w-[20px] text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link href="/signIn" onClick={() => setMenuOpen(false)}>
                                <span className="flex items-center justify-center gap-2 border-b-2 border-transparent pb-1 transition duration-1000 ease-in-out hover:border-white">
                                    <svg
                                        className="h-[23px] w-[20px] text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Log in
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
