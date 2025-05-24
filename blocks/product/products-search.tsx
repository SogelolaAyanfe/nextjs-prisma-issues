'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ProductMiniCard } from 'blocks/product/product-mini-card'
import { Disclosure, DisclosureButton, DisclosurePanel } from 'components/disclosure'
import { Divider } from 'components/divider'
import { Radio, RadioField, RadioGroup } from 'components/radio'
import { Text } from 'components/text'
import { productMock } from 'modules/domain/product-manager/entities'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { routes } from 'routes'

const products = [
    { ...productMock, id: '1' },
    { ...productMock, id: '2' },
    { ...productMock, id: '3' },
    { ...productMock, id: '4' },
]

type Params = {
    id: string
    sort: 'newest' | 'price-asc' | 'price-desc'
}

const DEFAULT_SORT = 'newest'

const SortFilter = () => {
    const { id, ...params } = useParams<Params>()
    const [sort, setSort] = useState<Params['sort']>(params.sort ?? DEFAULT_SORT)
    const router = useRouter()

    useEffect(() => {
        router.push(
            routes.store.products({
                ...params,
                vendorId: id,
                params: { sort },
            }),
        )
    }, [sort, id, router])

    return (
        <Disclosure>
            <DisclosureButton className="group flex cursor-pointer items-center justify-between">
                <Text className="!text-md font-medium text-black uppercase dark:!text-white">
                    Sort by
                </Text>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="py-2">
                <RadioGroup
                    value={sort}
                    onChange={value => {
                        setSort(value as 'newest' | 'price-asc' | 'price-desc')
                    }}
                >
                    <RadioField>
                        <Radio value="price-asc" />
                        <Text>Price: Low to High</Text>
                    </RadioField>
                    <RadioField>
                        <Radio value="price-desc" />
                        <Text>Price: High to Low</Text>
                    </RadioField>
                    <RadioField>
                        <Radio value="newest" />
                        <Text>Newest</Text>
                    </RadioField>
                </RadioGroup>
            </DisclosurePanel>
        </Disclosure>
    )
}

export const ProductsSearch = () => {
    return (
        <div className="flex gap-12">
            <div className="flex-[0.7]">
                <div className="sticky top-[80px] rounded-xl">
                    <div className="flex flex-col gap-2">
                        <SortFilter />
                        <Divider />
                    </div>
                </div>
            </div>
            <div className="grid flex-1/2 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <ProductMiniCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
