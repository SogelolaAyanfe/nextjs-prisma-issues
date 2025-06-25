import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type BlogItemProps = {
    imgsrc: string | StaticImageData
    author: string
    date?: string
    title?: string
    info: string
    link?: string
}

export default function BlogItems({
    imgsrc,
    author,
    date,
    title,
    info,
    link,
}: BlogItemProps) {
    return (
        <div className="flex flex-col gap-[5px]">
            <div className="relative h-[400px] max-w-[500px] overflow-hidden">
                <Link href="/blogPost">
                    <Image
                        src={imgsrc}
                        alt="Blog post image"
                        fill
                        className="object-cover"
                    />
                </Link>
            </div>
            <div className="flex flex-row gap-[10px] text-[17px]">
                <p>{author}</p>
                <p>{date}</p>
            </div>
            <p className="text-black-900 max-w-[500px] text-[25px]">{title}</p>
            <div className="max-w-[500px] flex-row pb-[20px]">
                <p>{info}</p>
                {link ? (
                    <Link
                        href="/blogPost"
                        className="cursor-pointer text-blue-600 hover:underline"
                    >
                        See more
                    </Link>
                ) : null}
            </div>
        </div>
    )
}
