import Image, { StaticImageData } from 'next/image'

type BlogCardProps = {
    title?: string
    imgsrc: string | StaticImageData
    date?: string
    author: string
    info: string
}

export default function Page({ title, date, imgsrc, author, info }: BlogCardProps) {
    return (
        <div className="flex w-full flex-col items-center gap-[10px] p-[10px] pt-[60px]">
            <div className="max-w-[800px] pb-[20px] text-center text-[35px] font-black max-sm:text-[30px]">
                {title}
            </div>
            <div className="pb-[20px]">{date}</div>
            <div className="flex max-h-[670px] max-w-[1300px] justify-center">
                <Image src={imgsrc} alt="blog post image" width={1300} height={670} />
            </div>
            <div className="flex max-w-[1300px] flex-col">
                <p className="max-w-[1300px] pb-[40px]">{author}</p>
                <p className="max-w-[1300px] pb-[50px] leading-relaxed whitespace-pre-line">
                    {info}
                </p>
            </div>
        </div>
    )
}
