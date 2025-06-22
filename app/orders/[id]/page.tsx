'use client'

import { AppShell } from 'components/app-shell'
import { Avatar } from 'components/avatar'
import { Card } from 'components/card'
import { Divider } from 'components/divider'
import { Heading } from 'components/heading'
import { Text, TextLink } from 'components/text'
import { VerifiedBadge } from 'components/verified-badge'
import { Order, OrderItem } from 'modules/domain/order-manager/entities/order'
import { orderMock } from 'modules/domain/order-manager/entities/order.mock'
import { productMock } from 'modules/domain/product-manager/entities/product.mock'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import Image from 'next/image'
import { routes } from 'routes'

const OrderProductList = ({ items }: { items: OrderItem[] }) => (
    <div className="space-y-4">
        {items.map((item, idx) => (
            <div
                key={item.productId}
                className="group relative flex gap-3 rounded-2xl border-1 border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Image
                        src={productMock.images[0]}
                        alt={productMock.name}
                        fill
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex-1">
                    <Text className="text-sm font-medium">{productMock.name}</Text>
                    <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                        Qty: {item.quantity} | Price: GBP {item.price} | Total: GBP{' '}
                        {item.total}
                    </Text>
                    {item.attributes && (
                        <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                            {Object.entries(item.attributes)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(', ')}
                        </Text>
                    )}
                </div>
            </div>
        ))}
    </div>
)

const StatusBar = ({ status }: { status: string }) => (
    <div className="mb-2">
        <Heading level={4} className="mb-1 text-xs font-bold tracking-wide uppercase">
            Status
        </Heading>
        <div className="h-2 w-full rounded-full bg-blue-200">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: '100%' }} />
        </div>
        <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{status}</Text>
    </div>
)

const AddressBlock = ({ title, address }: { title: string; address: any }) => (
    <div>
        <Text className="mb-1 font-bold uppercase">{title}</Text>
        <Text>{address.name}</Text>
        <Text>{address.address}</Text>
        <Text>
            {address.city}
            {address.state ? `, ${address.state}` : ''}
            {address.country ? `, ${address.country}` : ''}
        </Text>
        <Text>{address.postalCode}</Text>
        <Text>{address.phone}</Text>
    </div>
)

const OrderDetailsSection = ({ order }: { order: Order }) => (
    <Card className="flex flex-col justify-between gap-6 p-6 dark:!bg-zinc-800">
        {/* <StatusBar
            status={order.status === 'delivered' ? "It's fulfilled" : "It's in progress"}
        />
        <Divider /> */}
        <div>
            <div className="mb-4 flex items-center gap-2">
                <Avatar
                    src={vendorMock.logo}
                    className="size-8 border-1 !border-zinc-100 dark:border-white"
                />
                <TextLink
                    href={routes.store.home({ id: vendorMock.id })}
                    className="!text-xl font-semibold !no-underline"
                >
                    {vendorMock.name}
                </TextLink>
                <VerifiedBadge showText={false} />
            </div>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                Placed on{' '}
                {order.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}{' '}
                {order.createdAt.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                Payment Status:{' '}
                <span className="font-bold text-zinc-900 dark:text-white">
                    It's In Progress
                </span>
            </Text>
        </div>
        <Divider />
        <AddressBlock title="Billing Address" address={order.shippingAddress} />
        <Divider />
        <AddressBlock title="Shipping Address" address={order.shippingAddress} />
    </Card>
)

const OrderDetailsPage = () => {
    const order = orderMock
    return (
        <AppShell>
            <div className="flex flex-col gap-8">
                <Heading level={2} className="mb-2 !text-2xl font-extrabold">
                    Order #{order.orderNumber}
                </Heading>
                <div className="flex flex-col gap-24 bg-zinc-50 lg:flex-row dark:bg-zinc-900">
                    <div className="flex flex-col lg:flex-1/3">
                        <OrderProductList items={order.items} />
                    </div>
                    <div className="sticky top-[80px] flex-col lg:flex-1">
                        <OrderDetailsSection order={order} />
                    </div>
                </div>
            </div>
        </AppShell>
    )
}

export default OrderDetailsPage
