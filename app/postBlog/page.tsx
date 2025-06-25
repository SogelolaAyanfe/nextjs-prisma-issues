import OtherLayouts from 'app/blogPost/layout'

export default function PostBlog() {
    return (
        <OtherLayouts>
            <div className="flex w-full flex-col items-center gap-[30px] p-9 pt-[90px]">
                <h1 className="text-[35px] font-black">Post A blog</h1>
                <form method="POST">
                    <div className="flex flex-row gap-[100px] max-lg:flex-col max-lg:gap-[40px]">
                        <div className="flex flex-col gap-[20px] max-lg:items-center">
                            <h1 className="text-[20px] font-medium">
                                Add an image for your blog
                            </h1>
                            <label
                                htmlFor="imageUpload"
                                className="h-[300px] w-[300px] items-center rounded bg-neutral-700 px-4 py-2 pt-[50px] text-center text-[100px] font-semibold text-white hover:bg-neutral-800"
                            >
                                +
                            </label>
                            <input
                                type="file"
                                // placeholder='Add your image'
                                id="imageUpload"
                                name="image"
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                        <div className="flex max-w-[700px] min-w-[400px] flex-col gap-[20px] pt-[40px]">
                            <input
                                type="text"
                                placeholder="Title"
                                className="] h-[45px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="h-[45px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            />
                            <textarea
                                placeholder="Add additional note to your order"
                                className="h-[300px] max-w-[600px] min-w-[400px] rounded-md border-[2px] border-black pl-[5px] placeholder-black"
                            ></textarea>
                            <button className="h-[30px] max-w-[100px] rounded-md bg-black text-white hover:bg-neutral-800">
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </OtherLayouts>
    )
}
