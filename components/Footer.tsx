import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="flex justify-around gap-[30px] bg-black p-20 text-white max-sm:flex-col-reverse max-sm:gap-[40px] max-sm:p-3">
            <div className="flex flex-col gap-[20px]">
                <div className="flex max-w-[700px] flex-col gap-[20px]">
                    <p className="text-[25px]">Blogged.</p>
                    <p className="sm:max-w-[800px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sed
                        scelerisque elementum eros, a porta erat auctor sit amet. Mauris
                        nec mi ornare ante hendrerit porta nec gravida nisl. Suspendisse
                        vitae ligula consequat, tristique libero eu, facilisis quam.
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
    )
}
