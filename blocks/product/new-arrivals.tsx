'use client'

import { GroupedProducts } from 'blocks/product/grouped-products'
import { productMock } from 'modules/domain/product-manager/entities'
import { Vendor } from 'modules/domain/vendor-manager'

const products = [
    { ...productMock, id: '1' },
    { ...productMock, id: '2' },
    { ...productMock, id: '3' },
    { ...productMock, id: '4' },
]

export const NewArrivals = ({ vendor }: { vendor?: Pick<Vendor, 'id'> }) => (
    <GroupedProducts title="New Arrivals" products={products} />
)
