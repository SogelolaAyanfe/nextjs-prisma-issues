'use client'

import clsx from 'clsx'
import {
    Product,
    ProductAvailabilityStatus,
} from 'modules/domain/product-manager/entities/product'
import Image from 'next/image'

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

interface ProductMiniCardProps {
    product: Product
}

export function ProductMiniCard({ product }: ProductMiniCardProps) {
    const availability = availabilityConfig[product.availabilityStatus]

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            {/* Image container */}
            <div className="aspect-h-1 aspect-w-1 relative bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition group-hover:opacity-75"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                    {product.name}
                </h3>

                <div className="flex flex-1 flex-col justify-end">
                    {/* Price */}
                    <p className="text-base font-medium text-zinc-900 dark:text-white">
                        {product.salePrice ? (
                            <>
                                <span className="mr-2 text-zinc-500 line-through">
                                    ${product.price}
                                </span>
                                ${product.salePrice}
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
        </div>
    )
}
