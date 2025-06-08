'use client'

import { HeartIcon } from '@heroicons/react/20/solid'
import { AddToCartButton } from 'blocks/product/add-to-cart-button'
import { AvailabilityBadge } from 'components/availability-badge'
import { Avatar } from 'components/avatar'
import { Select } from 'components/select'
import { format } from 'lib/money'
import { Product } from 'modules/domain/product-manager/entities/product'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { routes } from 'routes'

type ProductWishlistCardProps = {
    product: Pick<
        Product,
        'name' | 'images' | 'price' | 'discountedPrice' | 'availabilityStatus' | 'id'
    >
    showVendor?: boolean
    onRemove?: (productId: string) => void
}

const useIsStorePage = () => {
    const pathname = usePathname()
    const storeRoutePattern = routes.store.home({ id: ':id' })
    const isStorePage = pathname.match(
        new RegExp(storeRoutePattern.replace(':id', '[^/]+').replace('/home', '')),
    )
    return isStorePage
}

export const ProductWishlistCard = ({
    product,
    showVendor = true,
    onRemove,
}: ProductWishlistCardProps) => {
    const isStorePage = useIsStorePage()
    const [quantity, setQuantity] = useState(1)

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (onRemove) {
            onRemove(product.id)
        }
        console.log('Removing from wishlist:', product.name)
    }

    return (
        <div className="relative w-full space-y-3">
            {!isStorePage && showVendor && (
                <Link
                    className="flex cursor-pointer items-center space-x-2"
                    href={routes.store.home({ id: vendorMock.id })}
                >
                    <Avatar src={vendorMock.logo} className="size-8" />
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                            {vendorMock.name}
                        </p>

                        <p className="text-xs text-zinc-500 dark:text-zinc-300">
                            {vendorMock.address}
                        </p>
                    </div>
                </Link>
            )}
            <Link
                href={routes.product({ id: product.id })}
                className="group relative flex cursor-pointer flex-col overflow-hidden"
            >
                {/* Image container */}
                <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 pb-[100%] dark:border-zinc-800 dark:bg-zinc-800">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition group-hover:opacity-75"
                    />
                    <button
                        onClick={handleRemove}
                        className="align-center absolute top-2 right-2 flex cursor-pointer justify-center rounded-full bg-white p-[7px] opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-red-50"
                    >
                        <HeartIcon
                            color="grey"
                            data-slot="icon"
                            className="size-5 text-rose-500"
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col space-y-2 py-4">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                        {product.name}
                    </h3>

                    <div className="flex flex-1 flex-col justify-end">
                        {/* Price */}
                        <p className="text-base font-medium text-zinc-900 dark:text-white">
                            {product.discountedPrice ? (
                                <>
                                    <span className="mr-2 text-zinc-500 line-through">
                                        {format(product.price)}
                                    </span>
                                    {format(product.discountedPrice)}
                                </>
                            ) : (
                                format(product.price)
                            )}
                        </p>

                        <AvailabilityBadge product={product} />
                    </div>
                </div>
            </Link>
            {/* Add to Cart Section - Always visible */}
            <div className="mt-3 flex items-center gap-3">
                <div className="flex-3/4">
                    <AddToCartButton product={product} onClick={() => {}} size="md" />
                </div>
                <Select
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="flex-1/4"
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
