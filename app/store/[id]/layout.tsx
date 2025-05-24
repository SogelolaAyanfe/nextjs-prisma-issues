import { CheckBadgeIcon } from '@heroicons/react/20/solid'
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
                            className="size-15 border-1 border-zinc-100 xl:size-32 dark:border-white"
                        />
                    </div>
                    <div className="flex flex-col pt-1">
                        <div className="flex items-center gap-2">
                            <Heading className="text-xxl font-bold">
                                {vendorMock.name}
                            </Heading>
                            <CheckBadgeIcon className="size-6 fill-blue-500" />
                        </div>
                        <Text className="text-xs dark:!text-white">
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
                <div className="flex w-full justify-center">
                    <div className="flex w-[850px] gap-2 text-center">
                        <div className="relative w-full bg-purple-500 p-6">
                            <p className="text-2xl font-extrabold uppercase dark:text-black">
                                Discounts up to 50% off
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Tab = () => {
    return (
        <div className="flex w-full justify-center gap-12 border-b border-zinc-200 py-4 uppercase dark:border-zinc-800 dark:lg:bg-zinc-900">
            <Link href={routes.store.home({ id: vendorMock.id })}>
                <Text className="text-sm font-medium dark:!text-white">Home</Text>
            </Link>
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
