'use client'

import { GroupedProducts } from 'blocks/product/grouped-products'
import { productMock } from 'modules/domain/product-manager/entities'
import { Vendor } from 'modules/domain/vendor-manager'

const products = [
    { ...productMock, id: '1' },
    { ...productMock, id: '2' },
    { ...productMock, id: '3' },
    { ...productMock, id: '4' },
    { ...productMock, id: '5' },
    { ...productMock, id: '6' },
    { ...productMock, id: '7' },
    { ...productMock, id: '8' },
    { ...productMock, id: '9' },
    { ...productMock, id: '10' },
]

export const NewArrivals = ({ vendor }: { vendor?: Pick<Vendor, 'id'> }) => (
    <GroupedProducts title="New Arrivals" products={products} />
)
