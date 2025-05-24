'use client'

import { faker } from '@faker-js/faker'
import { GroupedProducts } from 'blocks/product/grouped-products'
import { productMock } from 'modules/domain/product-manager/entities'

const products = [
    { ...productMock, id: '1' },
    { ...productMock, id: '2' },
    { ...productMock, id: '3' },
    { ...productMock, id: '4' },
]

export const FeaturedProducts = () => (
    <GroupedProducts title="Featured Products" products={products} />
)
