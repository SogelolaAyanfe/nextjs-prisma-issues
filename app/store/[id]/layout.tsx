import { auth } from 'auth'
import { Avatar } from 'components/avatar'
import { Heading } from 'components/heading'
import { Text } from 'components/text'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { routes } from 'routes'

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
                    <div className="relative mt-[-28px] flex transform gap-5">
                        <Avatar
                            src={vendorMock.logo}
                            className="size-15 border-2 border-white xl:size-30"
                        />
                    </div>
                    <div className="flex flex-col pt-1">
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
                {/* <p className="text-base/2 dark:text-white">{vendorMock.description}</p> */}
                <div className="flex w-full justify-center pb-8">
                    <div className="absolute flex w-full">
                        <div className="absolute top-0 left-0 left-[50%] flex w-[calc(100vw-0px)] translate-x-[-50%] gap-2 text-center">
                            <div className="relative w-full bg-purple-500 p-6">
                                <p className="text-base/2 text-purple-500 dark:text-white">
                                    Discounts up to 50% off
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Tab = () => {
    return (
        <div className="flex w-full justify-center gap-12 border-b border-zinc-800 py-4 uppercase">
            <Text className="text-sm font-medium dark:!text-white">Home</Text>
            <Link href={routes.store.products({ vendorId: vendorMock.id })}>
                <Text className="text-sm font-medium dark:!text-white">Products</Text>
            </Link>
            <Text className="text-sm font-medium dark:!text-white">Reviews</Text>
        </div>
    )
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="grow">
            <StoreHeader />
            <div className="mx-auto space-y-6 py-6">
                <Tab />
                <div className="py-6">{children}</div>
            </div>
        </div>
    )
}

export default Layout
