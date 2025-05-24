import { auth } from 'auth'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { NewArrivals } from 'blocks/product/new-arrivals'
import { VendorRefundPolicy } from 'blocks/store/vendor-refund-policy'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { StarRating } from 'components/star-rating'
import { Text } from 'components/text'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { FaEnvelope } from 'react-icons/fa'

const StatsItem = ({
    label,
    value,
}: {
    label: string
    value: string | number | ReactNode
}) => {
    return (
        <div>
            <Text className="mb-1 dark:text-zinc-400">{label}</Text>
            {typeof value === 'string' || typeof value === 'number' ? (
                <Text className="!text-xl font-semibold">{value}</Text>
            ) : (
                value
            )}
        </div>
    )
}

const StoreStats = () => {
    // Mocked values for now
    const rating = 4.5
    const totalReviews = 120
    // You can replace these with real data when available

    return (
        <Card className="flex flex-col gap-6 p-6 dark:!bg-zinc-800">
            <div className="flex flex-col gap-4">
                <Text className="!text-md font-normal">
                    A boutique clothing store offering curated contemporary fashion, from
                    casual to statement pieces. We focus on sustainable practices and
                    premium materials.
                </Text>
                <StatsItem label="Rating" value={<StarRating rating={rating} />} />
                <StatsItem label="Reviews" value={totalReviews} />
                <StatsItem label="Refund Policy" value={<VendorRefundPolicy />} />
                <Button
                    href={`mailto:${vendorMock.email}`}
                    className="mt-2 flex w-full !items-center !justify-center gap-2"
                >
                    <FaEnvelope />
                    Contact Store
                </Button>
                {/*
                    // Other suggested stats/details:
                    // - Number of products
                    // - Store open/close status or hours
                    // - Store location (city/country)
                    // - Years in business or "since" year
                    // - Response time (e.g., "Typically replies in 1 hour")
                    // - Return policy or shipping info
                    // - Social proof (e.g., "10k+ customers served")
                */}
            </div>
        </Card>
    )
}

const Collection = () => {}

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="flex flex-col gap-12">
            <div className="flex gap-6">
                <div className="flex flex-1">
                    <StoreStats />
                </div>
                <div className="flex flex-1/3">
                    <FeaturedProducts />
                </div>
            </div>
            <FeaturedProducts />
            <NewArrivals />
        </div>
    )
}

export default Home
