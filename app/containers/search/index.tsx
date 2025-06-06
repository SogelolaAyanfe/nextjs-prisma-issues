'use client'

import { ProductMiniCard } from 'blocks/product/product-mini-card'
import { ProductAvailabilityStatus } from 'modules/domain/product-manager/entities/product'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type SearchResult = {
    id: string
    name: string
    price: number
    discountedPrice: number | null
    description?: string
    images: string[]
    availabilityStatus: ProductAvailabilityStatus
    rating?: number
}

const mockResults: SearchResult[] = [
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
        id: '2',
        name: 'Safari Backpack',
        price: 150,
        discountedPrice: null,
        description: 'Durable backpack for outdoor adventures',
        images: [
            'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.3,
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
        id: '5',
        name: 'Gaming Mouse',
        price: 80,
        discountedPrice: 60,
        description: 'Precision gaming mouse with RGB lighting',
        images: [
            'https://images.pexels.com/photos/7151694/pexels-photo-7151694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        availabilityStatus: ProductAvailabilityStatus.LIMITED_AVAILABILITY,
        rating: 4.7,
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
        id: '7',
        name: 'Desk Organizer',
        price: 45,
        discountedPrice: null,
        description: 'Bamboo desk organizer for office supplies',
        images: [
            'https://images.pexels.com/photos/27559507/pexels-photo-27559507/free-photo-of-a-vase-with-a-flower-arrangement-on-the-desk.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        availabilityStatus: ProductAvailabilityStatus.IN_STOCK,
        rating: 4.2,
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

export const SearchContainer = () => {
    const searchParams = useSearchParams()
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const query = searchParams.get('q') || ''
    const location = searchParams.get('location') || ''
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '1000')

    useEffect(() => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            let filteredResults = mockResults

            // Filter by search query
            if (query) {
                filteredResults = filteredResults.filter(
                    item =>
                        item.name.toLowerCase().includes(query.toLowerCase()) ||
                        item.description?.toLowerCase().includes(query.toLowerCase()),
                )
            }

            // Filter by price range
            filteredResults = filteredResults.filter(item => {
                const productPrice = item.discountedPrice || item.price
                return productPrice >= minPrice && productPrice <= maxPrice
            })

            setResults(filteredResults)
            setIsLoading(false)
        }, 500)
    }, [query, location, minPrice, maxPrice])

    return (
        <div className="space-y-8">
            {/* Search Header */}
            <div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {(minPrice > 0 || maxPrice < 1000) && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            ${minPrice} - ${maxPrice}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {results.length} product{results.length !== 1 ? 's' : ''}
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div>
                    {/* Products Grid */}
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                            {results.map(product => (
                                <ProductMiniCard
                                    key={product.id}
                                    product={product}
                                    showVendor={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg text-zinc-500 dark:text-zinc-400">
                                No products found for your search criteria.
                            </p>
                            <p className="mt-2 text-zinc-400 dark:text-zinc-500">
                                Try adjusting your filters or search terms.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchContainer
