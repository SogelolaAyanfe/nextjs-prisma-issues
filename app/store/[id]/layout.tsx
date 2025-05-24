import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { auth } from 'auth'
import { Avatar } from 'components/avatar'
import { FollowButton } from 'components/follow-button'
import { Heading } from 'components/heading'
import { Link } from 'components/link'
import { Text } from 'components/text'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { routes } from 'routes'

const VendorSocialLinks = () => {
    return (
        <div className="flex gap-5">
            {vendorMock.socialLinks.facebook && (
                <Link href={vendorMock.socialLinks.facebook} target="_blank">
                    <FaFacebook size={25} />
                </Link>
            )}
            {vendorMock.socialLinks.instagram && (
                <Link href={vendorMock.socialLinks.instagram} target="_blank">
                    <FaInstagram size={25} />
                </Link>
            )}
            {/* {vendorMock.socialLinks.website && (
                <Link href={vendorMock.socialLinks.website} className="align-center flex">
                    <LinkIcon className="size-5" />
                    <Text className="text-sm">
                        {truncate(vendorMock.socialLinks.website, 20)}
                    </Text>
                </Link>
            )} */}
            {vendorMock.socialLinks.whatsapp && (
                <Link href={vendorMock.socialLinks.whatsapp} target="_blank">
                    <FaWhatsapp size={25} />
                </Link>
            )}
        </div>
    )
}
const StoreHeader = () => {
    return (
        <div className="w-full">
            {/* Image container */}
            <div className="flex w-full items-center justify-center pb-[80px]">
                <div className="absolute top-0 flex w-full items-center justify-center">
                    <div className="relative h-[170px] w-full max-w-[1350px] overflow-hidden rounded-b-2xl">
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
                <div className="flex justify-between">
                    <div className="flex gap-5">
                        <div className="relative mt-[-28px] flex transform gap-5">
                            <Avatar
                                src={vendorMock.logo}
                                className="size-15 border-1 !border-zinc-100 xl:size-32 dark:border-white"
                            />
                        </div>
                        <div className="flex flex-col pt-1">
                            <div className="flex items-center gap-2">
                                <Heading className="text-xxl font-bold">
                                    {vendorMock.name}
                                </Heading>
                                <div className="flex items-center gap-1">
                                    <CheckBadgeIcon className="size-6 fill-blue-400" />
                                    <Text className="!text-xs !text-blue-400">
                                        Verified store
                                    </Text>
                                </div>
                                <FollowButton isFollowing={true} />
                            </div>
                            <Text className="text-xs dark:!text-white">
                                {/* @username ·{' '} */}
                                <span className="text-zinc-500 dark:text-zinc-400">
                                    {vendorMock.category}
                                </span>
                            </Text>
                            <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                                {vendorMock.address}
                            </Text>
                        </div>
                    </div>
                    <div className="pt-1">
                        <VendorSocialLinks />
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
