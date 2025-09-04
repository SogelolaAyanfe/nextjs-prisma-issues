'use client'
import Navbar from 'components/Navbar'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

export default function logOut() {
    return (
        <>
            <Navbar />
            <div className="flex justify-between bg-stone-400 pt-[90px] max-sm:flex-col-reverse">
                <div className="flex h-full w-1/2 flex-col gap-[170px] max-sm:w-full max-sm:pb-[170px]">
                    <div className="flex flex-col gap-[20px] pt-[25%]">
                        <h1 className="font-900 justify-center text-center text-[30px] text-white">
                            Create an account
                        </h1>
                        <p className="justify-center text-center text-white">{`Let's get you started`}</p>
                        <div>
                            <form className="flex flex-col items-center justify-center gap-[30px] text-white">

                                <button
                                    onClick={() => signOut({callbackUrl: '/'})}
                                    className="w-1/2 bg-black pt-[10px] pb-[10px] text-white hover:bg-neutral-800 max-sm:w-[75%]"
                                >
                                    Log out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex h-screen w-1/2 content-center items-center justify-center max-sm:h-1/2 max-sm:w-full">
                    <Image
                        src="/signUp.jpeg"
                        alt="Sign Up Image"
                        width={500}
                        height={500}
                        className="rounded-xl border-[5px] border-white max-sm:h-[400px] max-sm:w-full max-sm:rounded-none max-sm:border-none sm:h-[90%] sm:w-[90%] md:h-[90%] md:w-[90%] lg:h-[90%] lg:w-[90%] xl:h-[90%]"
                    />
                </div>
            </div>
        </>
    )
}
