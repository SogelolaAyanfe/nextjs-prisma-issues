import clsx from 'clsx'
import {
    Product,
    ProductAvailabilityStatus,
} from 'modules/domain/product-manager/entities/product'

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

export const AvailabilityBadge = ({
    product,
}: {
    product: Pick<Product, 'availabilityStatus'>
}) => {
    const availability = availabilityConfig[product.availabilityStatus]
    return (
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
    )
}
