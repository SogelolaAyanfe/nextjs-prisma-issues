import { auth } from 'auth'
import { Avatar } from 'components/avatar'
import { Heading } from 'components/heading'
import { Text } from 'components/text'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const StoreHeader = () => {
    return (
        <div className="w-full">
            {/* Image container */}
            <div className="flex w-full items-center justify-center pb-[260px]">
                <div className="absolute top-0 flex w-full items-center justify-center">
                    <div className="relative h-[350px] w-full max-w-[1350px] overflow-hidden rounded-b-2xl">
                        <Image
                            src={vendorMock.banner}
                            alt={vendorMock.name}
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-6">
                <div className="flex gap-5">
                    <div className="relative mt-[-30px] flex transform gap-5">
                        <Avatar
                            src={vendorMock.logo}
                            className="size-15 border-2 border-white xl:size-30"
                        />
                    </div>
                    <div className="flex flex-col gap-[1px] pt-1">
                        <Heading className="text-xxl font-bold">
                            {vendorMock.name}
                        </Heading>
                        <Text className="text-xs text-zinc-950 dark:!text-white">
                            @username ·{' '}
                            <span className="text-zinc-500 dark:text-zinc-400">
                                {vendorMock.category}
                            </span>
                        </Text>
                        <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                            {vendorMock.address}
                        </Text>
                    </div>
                </div>
                <p className="text-base/2 dark:text-white">
                    {vendorMock.description}
                </p>
                {/* <div className="flex w-full justify-center">
                    <div className="absolute flex w-full">
                        <div className="absolute top-0 left-0 left-[50%] flex w-[calc(100vw-60px)] translate-x-[-50%] gap-2 text-center">
                            <div className="relative w-full bg-purple-500 p-6">
                                <p className="text-base/2 text-purple-500 dark:text-white">
                                    {vendorMock.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="grow">
            <StoreHeader />
            <div className="sx:p-6 mx-auto max-w-7xl py-6">{children}</div>
        </div>
    )
}

export default Layout
