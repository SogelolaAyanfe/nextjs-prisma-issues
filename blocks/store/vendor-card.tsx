import { ProductMiniCard } from 'blocks/product/product-mini-card'
import { VendorRefundPolicy } from 'blocks/store/vendor-refund-policy'
import { Avatar } from 'components/avatar'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { StarRating } from 'components/star-rating'
import { Text, TextLink } from 'components/text'
import { VerifiedBadge } from 'components/verified-badge'
import { productMock } from 'modules/domain/product-manager/entities'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import { ReactNode } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { routes } from 'routes'

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

const VendorStats = ({ showLogo }: { showLogo?: boolean }) => {
    // Mocked values for now
    const rating = 4.5
    const totalReviews = 120
    // You can replace these with real data when available

    return (
        <Card className="flex flex-col justify-between gap-6 p-6 dark:!bg-zinc-800">
            <div className="flex flex-col gap-4">
                {showLogo && (
                    <div className="flex items-center gap-2">
                        <Avatar
                            src={vendorMock.logo}
                            className="size-8 border-1 !border-zinc-100 dark:border-white"
                        />
                        <TextLink
                            href={routes.store.home({ id: vendorMock.id })}
                            className="!text-xl font-semibold !no-underline"
                        >
                            {vendorMock.name}
                        </TextLink>
                        <VerifiedBadge showText={false} />
                    </div>
                )}
                <Text className="!text-md font-normal">
                    A boutique clothing store offering curated contemporary fashion, from
                    casual to statement pieces.
                </Text>
                <StatsItem label="Rating" value={<StarRating rating={rating} />} />
                <StatsItem label="Reviews" value={totalReviews} />
                <StatsItem label="Refund Policy" value={<VendorRefundPolicy />} />

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
            <Button
                href={`mailto:${vendorMock.email}`}
                className="flex w-full !items-center !justify-center gap-2"
            >
                <FaEnvelope />
                Contact Store
            </Button>
        </Card>
    )
}

const products = [
    { ...productMock, id: '1' },
    { ...productMock, id: '2' },
    { ...productMock, id: '3' },
    { ...productMock, id: '4' },
]

const FeaturedProducts = () => {
    return (
        <div className="flex w-full flex-1 flex-wrap gap-x-6 gap-y-10">
            {products.slice(0, 3).map(product => (
                <div className="flex flex-1">
                    <ProductMiniCard
                        key={product.id}
                        product={product}
                        showVendor={false}
                    />
                </div>
            ))}
        </div>
    )
}

export const VendorCard = ({ showLogo }: { showLogo?: boolean }) => {
    return (
        <div className="flex gap-6">
            <div className="flex flex-1">
                <VendorStats showLogo={showLogo} />
            </div>
            <div className="flex flex-1/3">
                <FeaturedProducts />
            </div>
        </div>
    )
}
