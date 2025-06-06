'use client'

import {
    BuildingStorefrontIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    ShoppingBagIcon,
} from '@heroicons/react/20/solid'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Heading } from 'components/heading'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SearchResult {
    id: string
    name: string
    type: 'store' | 'product'
    location?: string
    price?: number
    description?: string
    imageUrl?: string
    rating?: number
}

export const SearchContainer = () => {
    const searchParams = useSearchParams()
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const query = searchParams.get('q') || ''
    const location = searchParams.get('location') || ''
    const minPrice = parseInt(searchParams.get('minPrice') || '0')
    const maxPrice = parseInt(searchParams.get('maxPrice') || '1000')

    // Mock search results
    const mockResults: SearchResult[] = [
        {
            id: '1',
            name: 'Electronics Store Kenya',
            type: 'store',
            location: 'Nairobi, Kenya',
            description: 'Premium electronics and gadgets store',
            rating: 4.5,
            imageUrl: '/store1.jpg',
        },
        {
            id: '2',
            name: 'Safari Outfitters',
            type: 'store',
            location: 'Mombasa, Kenya',
            description: 'Adventure gear and safari equipment',
            rating: 4.8,
            imageUrl: '/store2.jpg',
        },
        {
            id: '3',
            name: 'MacBook Pro M3',
            type: 'product',
            price: 2500,
            description: 'Latest MacBook Pro with M3 chip',
            rating: 4.9,
            imageUrl: '/product1.jpg',
        },
        {
            id: '4',
            name: 'Safari Backpack',
            type: 'product',
            price: 150,
            description: 'Durable backpack for outdoor adventures',
            rating: 4.3,
            imageUrl: '/product2.jpg',
        },
        {
            id: '5',
            name: 'Wireless Headphones',
            type: 'product',
            price: 200,
            description: 'High-quality wireless headphones',
            rating: 4.6,
            imageUrl: '/product3.jpg',
        },
    ]

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

            // Filter by location
            if (location) {
                filteredResults = filteredResults.filter(item =>
                    item.location?.toLowerCase().includes(location.toLowerCase()),
                )
            }

            // Filter by price range
            filteredResults = filteredResults.filter(item => {
                if (item.type === 'product' && item.price) {
                    return item.price >= minPrice && item.price <= maxPrice
                }
                return true
            })

            setResults(filteredResults)
            setIsLoading(false)
        }, 500)
    }, [query, location, minPrice, maxPrice])

    const storeResults = results.filter(result => result.type === 'store')
    const productResults = results.filter(result => result.type === 'product')

    return (
        <div className="space-y-8">
            {/* Search Header */}
            <div>
                <Heading level={1} className="text-3xl">
                    Search Results
                </Heading>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {query && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Query: "{query}"
                        </span>
                    )}
                    {location && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <MapPinIcon className="mr-1 inline h-4 w-4" />
                            {location}
                        </span>
                    )}
                    {(minPrice > 0 || maxPrice < 1000) && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <CurrencyDollarIcon className="mr-1 inline h-4 w-4" />$
                            {minPrice} - ${maxPrice}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Stores Section */}
                    {storeResults.length > 0 && (
                        <div>
                            <Heading level={2} className="mb-6 flex items-center text-xl">
                                <BuildingStorefrontIcon className="mr-2 h-6 w-6" />
                                Stores ({storeResults.length})
                            </Heading>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {storeResults.map(store => (
                                    <Card key={store.id} className="overflow-hidden">
                                        <div className="h-48 bg-zinc-200 dark:bg-zinc-700"></div>
                                        <div className="p-6">
                                            <Heading level={3} className="text-lg">
                                                {store.name}
                                            </Heading>
                                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                {store.description}
                                            </p>
                                            {store.location && (
                                                <p className="mt-2 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                                                    <MapPinIcon className="mr-1 h-4 w-4" />
                                                    {store.location}
                                                </p>
                                            )}
                                            {store.rating && (
                                                <div className="mt-2 flex items-center">
                                                    <div className="flex text-yellow-400">
                                                        {'★'.repeat(
                                                            Math.floor(store.rating),
                                                        )}
                                                    </div>
                                                    <span className="ml-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                        {store.rating}
                                                    </span>
                                                </div>
                                            )}
                                            <Button className="mt-4 w-full" color="blue">
                                                Visit Store
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Products Section */}
                    {productResults.length > 0 && (
                        <div>
                            <Heading level={2} className="mb-6 flex items-center text-xl">
                                <ShoppingBagIcon className="mr-2 h-6 w-6" />
                                Products ({productResults.length})
                            </Heading>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {productResults.map(product => (
                                    <Card key={product.id} className="overflow-hidden">
                                        <div className="h-48 bg-zinc-200 dark:bg-zinc-700"></div>
                                        <div className="p-4">
                                            <Heading level={3} className="text-lg">
                                                {product.name}
                                            </Heading>
                                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                {product.description}
                                            </p>
                                            {product.price && (
                                                <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                                                    ${product.price}
                                                </p>
                                            )}
                                            {product.rating && (
                                                <div className="mt-2 flex items-center">
                                                    <div className="flex text-yellow-400">
                                                        {'★'.repeat(
                                                            Math.floor(product.rating),
                                                        )}
                                                    </div>
                                                    <span className="ml-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                        {product.rating}
                                                    </span>
                                                </div>
                                            )}
                                            <Button className="mt-3 w-full" color="blue">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {results.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-lg text-zinc-500 dark:text-zinc-400">
                                No results found for your search criteria.
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
