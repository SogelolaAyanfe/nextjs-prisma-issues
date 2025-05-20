'use client'

import clsx from 'clsx'
import { Avatar } from 'components/avatar'
import {
    Product,
    ProductAvailabilityStatus,
} from 'modules/domain/product-manager/entities/product'
import { userMock } from 'modules/domain/user-manager/entities/user.mock'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from 'routes'

const availabilityConfig: Record<
    ProductAvailabilityStatus,
    { label: string; className: string }
> = {
    IN_STOCK: {
        label: 'In Stock',
        className:
            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
    },
    LOW_STOCK: {
        label: 'Low Stock',
        className:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
    },
    LIMITED_AVAILABILITY: {
        label: 'Limited Availability',
        className:
            'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    },
}

type ProductMiniCardProps = {
    product: Pick<
        Product,
        'name' | 'images' | 'price' | 'discountedPrice' | 'availabilityStatus'
    >
}

export const ProductMiniCard = ({ product }: ProductMiniCardProps) => {
    const availability = availabilityConfig[product.availabilityStatus]

    return (
        <div className="relative space-y-2">
            <Link
                className="flex cursor-pointer space-x-2"
                href={routes.store.home({ id: 'some id' })}
            >
                <Avatar src={userMock.image} className="size-9" />
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {userMock.name}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-300">
                        Ibadan, Nigeria
                    </p>
                </div>
            </Link>
            <Link
                href="#"
                className="group relative flex cursor-pointer flex-col overflow-hidden"
            >
                {/* Image container */}
                <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 pb-[120%] dark:border-zinc-800 dark:bg-zinc-800">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition group-hover:opacity-75"
                    />
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
                                        ${product.price}
                                    </span>
                                    ${product.discountedPrice}
                                </>
                            ) : (
                                `$${product.price}`
                            )}
                        </p>

                        {/* Availability badge */}
                        <div className="mt-2">
                            <span
                                className={clsx(
                                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                    availability.className,
                                )}
                            >
                                {availability.label}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
