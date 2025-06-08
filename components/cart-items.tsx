import clsx from 'clsx'
import { Avatar } from 'components/avatar'
import { Select } from 'components/select'
import { Text, TextLink } from 'components/text'
import { VerifiedBadge } from 'components/verified-badge'
import { CartItem } from 'modules/domain/cart-manager/entities/cart'
import { productMock } from 'modules/domain/product-manager/entities/product.mock'
import {
    mockRating,
    mockReviewCount,
} from 'modules/domain/review-manager/entities/review.mock'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { routes } from 'routes'

type CartItemGroupProps = {
    items: CartItem[]
    isSelected: boolean
    onClick: () => void
}

export const CartItems = ({ items, isSelected, onClick }: CartItemGroupProps) => {
    const formatCurrency = (amount: number) => `GBP ${amount.toFixed(2)}`
    const product = productMock

    return (
        <div
            className={clsx(
                'group relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 hover:shadow-lg',
                isSelected
                    ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/10 dark:bg-green-950/20'
                    : 'border-zinc-200 hover:border-green-500 hover:shadow-green-500/5 dark:border-zinc-800 dark:hover:border-green-500',
            )}
            onClick={onClick}
        >
            <div className="mb-4 flex items-center gap-2">
                <Avatar
                    src={vendorMock.logo}
                    className="size-8 border-1 !border-zinc-100 dark:border-white"
                />
                <div>
                    <div className="flex items-center gap-1">
                        <TextLink
                            href={routes.store.home({ id: vendorMock.id })}
                            className="!text-lg font-semibold !no-underline"
                        >
                            {vendorMock.name}
                        </TextLink>
                        <VerifiedBadge showText={false} />
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-zinc-500 dark:text-white" size={13} />
                        <Text className="text-zinc-600 dark:text-zinc-400">
                            {mockRating.toFixed(1)} ({mockReviewCount})
                        </Text>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {items.map(item => (
                    <div key={item.productId} className="flex gap-3">
                        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover object-center transition group-hover:opacity-75"
                            />
                        </div>

                        <div className="flex-1">
                            <Text className="text-sm font-medium">{product.name}</Text>
                            {item.attributes && (
                                <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                                    {Object.entries(item.attributes)
                                        .map(([key, value]) => `${key}: ${value}`)
                                        .join(', ')}
                                </Text>
                            )}
                            <Select className="!w-18 mt-2" value={item.quantity}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </Select>
                        </div>

                        <div className="text-right">
                            <Text className="font-semibold">
                                {product.discountedPrice ? (
                                    <>
                                        <span className="line-through">
                                            {formatCurrency(item.price)}
                                        </span>
                                        <span className="ml-2">
                                            {formatCurrency(item.price)}
                                        </span>
                                    </>
                                ) : (
                                    formatCurrency(item.price)
                                )}
                            </Text>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
                    <Text className="font-semibold">Shop Total:</Text>
                    <Text className="font-semibold">
                        {formatCurrency(items.reduce((acc, item) => acc + item.price, 0))}
                    </Text>
                </div>
            </div>
        </div>
    )
}
