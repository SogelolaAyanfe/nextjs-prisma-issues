'use client'

import { faker } from '@faker-js/faker'
import { GroupedProducts } from 'blocks/product/grouped-products'
import { productMock } from 'modules/domain/product-manager/entities'
import { Vendor } from 'modules/domain/vendor-manager'

const products = Array.from({ length: 4 }, () => ({
    ...productMock,
    id: faker.string.uuid(),
}))

export const NewArrivals = ({ vendor }: { vendor?: Pick<Vendor, 'id'> }) => (
    <GroupedProducts title="New Arrivals" products={products} />
)
