'use client'

import { faker } from '@faker-js/faker'
import { productMock } from 'modules/domain/product-manager/entities'
import { ProductMiniCard } from './product-mini-card'

const products = Array.from({ length: 4 }, () => ({
    ...productMock,
    id: faker.string.uuid(),
}))

export const FeaturedProducts = () => {
    return (
        <div className="w-full">
            
            <h2 className="mb-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Featured Products
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {products.map(product => (
                    <ProductMiniCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="py-12 text-center">
                    <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
                        No products
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        No products are available at the moment.
                    </p>
                </div>
            )}
        </div>
    )
}
