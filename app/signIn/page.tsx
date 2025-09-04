'use client'
import Navbar from 'components/Navbar'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const router = useRouter()
    return (
        <>
            <Navbar />

            <div className="flex min-h-screen justify-between pt-[200px] pb-[50px] max-lg:flex-col-reverse max-lg:gap-8 max-lg:pt-[150px] max-md:pt-[150px] max-sm:pt-[150px]">
                <div className="flex h-full w-1/2 flex-col justify-center max-lg:w-full max-lg:pb-8">
                    <div className="flex flex-col gap-[40px] px-8 max-sm:px-4">
                        <h1 className="font-900 justify-center pt-[100px] text-center text-[27px] text-black max-lg:pt-[30px] max-md:pt-[30px] max-sm:pt-[30px] max-sm:text-[24px]">
                            Welcome to Blogged.
                        </h1>
                        <p className="justify-center text-center text-black max-sm:text-sm">
                            {`Keep exploring the creativeness of our writers`}
                        </p>
                        <div>
                            <form className="flex flex-col items-center justify-center gap-[40px] text-white max-sm:gap-6">
                                <button
                                    type="button"
                                    onClick={() => signIn('google', { callbackUrl: '/' })}
                                    className="w-[300px] rounded-md bg-black pt-[10px] pb-[10px] hover:bg-neutral-800 max-sm:w-full max-sm:py-3"
                                >
                                    Sign in with Google
                                </button>
                                <button
                                    type="button"
                                    className="w- w-[300px] rounded-md bg-black pt-[10px] pb-[10px] hover:bg-neutral-800 max-sm:w-full max-sm:py-3"
                                    onClick={() => signIn('github', { callbackUrl: '/' })}
                                >
                                    Sign in with GitHub
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex w-1/2 items-center justify-center px-8 max-lg:h-[50vh] max-lg:w-full max-sm:h-[40vh] max-sm:px-4">
                    <div className="relative h-full max-h-[600px] w-full max-w-[500px]">
                        <Image
                            src="/signUp.jpg"
                            alt="Sign Up Image"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                            className="rounded-xl border border-gray-200 object-cover max-lg:rounded-lg max-md:rounded-md max-sm:rounded-sm max-sm:border-none"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
