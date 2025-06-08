import clsx from 'clsx'
import { Avatar } from 'components/avatar'
import { Badge } from 'components/badge'
import type { CartItem } from 'components/cart/types'
import { Text, TextLink } from 'components/text'
import { VerifiedBadge } from 'components/verified-badge'
import {
    mockRating,
    mockReviewCount,
} from 'modules/domain/review-manager/entities/review.mock'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import { FaStar } from 'react-icons/fa'
import { routes } from 'routes'

type CartItemGroupProps = {
    items: CartItem[]
    isSelected: boolean
    onClick: () => void
}

export const CartItemGroup = ({ items, isSelected, onClick }: CartItemGroupProps) => {
    const formatCurrency = (amount: number) => `GBP ${amount.toFixed(2)}`

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

            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <Text className="text-xs">{item.image ? '🖼️' : '📦'}</Text>
                        </div>

                        <div className="flex-1">
                            <Text className="text-sm font-medium">{item.name}</Text>
                            {item.variant && (
                                <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                                    {item.variant}
                                </Text>
                            )}
                        </div>

                        <div className="text-right">
                            <Text className="font-semibold">
                                {formatCurrency(item.price)}
                            </Text>
                            {item.discountPercentage && (
                                <Badge color="green" className="ml-2 text-xs">
                                    {item.discountPercentage}% off
                                </Badge>
                            )}
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
