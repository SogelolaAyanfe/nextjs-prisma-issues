'use client'

import { HeartIcon } from '@heroicons/react/20/solid'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { AvailabilityBadge } from 'components/availability-badge'
import { Button } from 'components/button'
import { Fieldset, Label } from 'components/fieldset'
import { Heading } from 'components/heading'
import { Select } from 'components/select'
import { StarRating } from 'components/star-rating'
import { Text, TextLink } from 'components/text'
import { format } from 'lib/money'
import { Product, ProductAvailabilityStatus } from 'modules/domain/product-manager'
import { productMock } from 'modules/domain/product-manager/entities/product.mock'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import { useState } from 'react'
import { routes } from 'routes'

export const ProductDetailItem = ({
    label,
    value,
}: {
    label: string
    value: string | number
}) => {
    return (
        <div>
            <Text className="mb-1 dark:text-zinc-400">{label}</Text>
            <Text>{value}</Text>
        </div>
    )
}

const QuantitySelector = ({
    product,
    quantity,
    setQuantity,
}: {
    product: Pick<Product, 'stock'>
    quantity: number
    setQuantity: (quantity: number) => void
}) => {
    return (
        <Fieldset>
            <Label>Quantity</Label>
            <Select
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="!mt-2"
            >
                {Array.from({ length: product.stock }, (_, i) => (
                    <option key={`quantity-selector-${i + 1}`} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </Select>
        </Fieldset>
    )
}

const SaveForLaterButton = () => {
    return (
        <Button
            className="align-center flex justify-center !rounded-full border-none p-3 transition outline-none after:shadow-none"
            color="white"
        >
            <HeartIcon color="grey" data-slot="icon" className="!size-8" />
        </Button>
    )
}

const AddToCartButtonWithSaveForLater = ({
    product,
    onClick,
}: {
    product: Pick<Product, 'availabilityStatus'>
    onClick: () => void
}) => {
    if (
        product.availabilityStatus === ProductAvailabilityStatus.LIMITED_AVAILABILITY ||
        product.availabilityStatus === ProductAvailabilityStatus.LOW_STOCK
    ) {
        return (
            <div className="w-full space-y-2">
                <Text className="text-zinc-500 dark:!text-zinc-400">
                    Vendor typically confirms within 3 hours
                </Text>
                <div className="flex w-full items-center gap-4">
                    <Button size="lg" color="blue" className="w-full" onClick={onClick}>
                        Request Availability
                    </Button>
                    <SaveForLaterButton />
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full items-center gap-4">
            <Button size="lg" color="blue" className="w-full" onClick={onClick}>
                Add to Cart
            </Button>
            <SaveForLaterButton />
        </div>
    )
}

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL']

export const ProductPage = ({ params }: { params: { id: string } }) => {
    const [quantity, setQuantity] = useState(1)
    // In a real app, fetch product by params.id
    const product = productMock
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-50 md:flex-row">
                {/* Left: Images */}
                <div className="flex flex-1/6 flex-col items-center">
                    {product.images && product.images.length > 0 && (
                        <div className="relative w-full pb-[120%]">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}
                </div>
                {/* Right: Details */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Heading className="!text-3xl">{product.name}</Heading>
                        <AvailabilityBadge product={product} />
                    </div>
                    <Text className="!text-xl text-zinc-700 dark:text-zinc-200">
                        {format(product.price)}
                    </Text>
                    <TextLink
                        className="!text-md text-zinc-500 dark:text-zinc-300"
                        href={routes.store.home({ id: vendorMock.id })}
                    >
                        By {vendorMock.name}
                    </TextLink>
                    <ProductDetailItem label="SKU" value={product.sku} />

                    <Fieldset>
                        <Label>Size</Label>
                        <Select className="!mt-2">
                            {SIZE_OPTIONS.map(size => (
                                <option key={`size-selector-${size}`} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Select>
                    </Fieldset>
                    <QuantitySelector
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <AddToCartButtonWithSaveForLater
                        product={product}
                        onClick={() => {}}
                    />
                </div>
            </div>
            {/* Rating Section */}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">Rating</h2>
                <StarRating rating={4.5} />
            </div>
            {/* You might also like */}
            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">You might also like</h2>
                <FeaturedProducts />
            </div>
        </div>
    )
}
export default ProductPage
