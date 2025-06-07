'use client'

import { ProductWishlistCard } from 'blocks/product/product-wishlist-card'
import { Heading } from 'components/heading'
import { ProductAvailabilityStatus } from 'modules/domain/product-manager/entities/product'
import { useEffect, useState } from 'react'

type WishlistProduct = {
    id: string
    name: string
    price: number
    discountedPrice: number | null
    description?: string
    images: string[]
    availabilityStatus: ProductAvailabilityStatus
    rating?: number
}

// Mock wishlist products - subset of available products
const mockWishlistProducts: WishlistProduct[] = [
    {
        id: '1',
        name: 'MacBook Pro M3',
        price: 2500,
        discountedPrice: null,
        description: 'Latest MacBook Pro with M3 chip',
        images: [
            'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.9,
    },
    {
        id: '3',
        name: 'Wireless Headphones',
        price: 200,
        discountedPrice: 150,
        description: 'High-quality wireless headphones',
        images: [
            'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.LOW_STOCK,
        rating: 4.6,
    },
    {
        id: '4',
        name: 'Smart Watch',
        price: 350,
        discountedPrice: null,
        description: 'Advanced fitness tracking and notifications',
        images: [
            'https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.4,
    },
    {
        id: '6',
        name: 'Smartphone',
        price: 800,
        discountedPrice: null,
        description: 'Latest flagship smartphone with advanced camera',
        images: [
            'https://images.pexels.com/photos/16005007/pexels-photo-16005007/free-photo-of-apple-iphone-14-pro-max-mobile-phone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.5,
    },
    {
        id: '8',
        name: 'Coffee Maker',
        price: 120,
        discountedPrice: null,
        description: 'Programmable coffee maker with timer',
        images: [
            'https://images.pexels.com/photos/8052696/pexels-photo-8052696.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.8,
    },
]

export const WishlistContainer = () => {
    const [products, setProducts] = useState<WishlistProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading wishlist from API
        setTimeout(() => {
            setProducts(mockWishlistProducts)
            setIsLoading(false)
        }, 300)
    }, [])

    const handleRemoveProduct = (productId: string) => {
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== productId),
        )
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <Heading level={1} className="text-3xl">
                    Wishlist
                </Heading>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {products.length} saved product{products.length !== 1 ? 's' : ''}
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div>
                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map(product => (
                                <ProductWishlistCard
                                    key={product.id}
                                    product={product}
                                    showVendor={true}
                                    onRemove={handleRemoveProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg text-zinc-500 dark:text-zinc-400">
                                Your wishlist is empty.
                            </p>
                            <p className="mt-2 text-zinc-400 dark:text-zinc-500">
                                Start adding products you love to see them here.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default WishlistContainer
