'use client'

import { Button } from 'components/button'
import { Product, ProductAvailabilityStatus } from 'modules/domain/product-manager'

const buttonText = (product: Pick<Product, 'availabilityStatus'>) => {
    if (product.availabilityStatus === ProductAvailabilityStatus.LIMITED_AVAILABILITY) {
        return 'Request Availability'
    }
    return 'Add to Cart'
}

export const AddToCartButton = ({
    product,
    onClick,
    size = 'lg',
}: {
    product: Pick<Product, 'availabilityStatus'>
    onClick: () => void
    size?: 'sm' | 'md' | 'lg'
}) => (
    <Button size={size} color="blue" className="w-full" onClick={onClick}>
        {buttonText(product)}
    </Button>
)
