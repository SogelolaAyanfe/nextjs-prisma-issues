'use client'

import { Badge } from 'components/badge'
import { Button } from 'components/button'
import { Heading } from 'components/heading'
import { Text } from 'components/text'
import { capitalize, removeUnderscores } from 'lib/string'
import { Order, OrderStatus, PaymentStatus } from 'modules/domain/order-manager/entities'
import { orderMock } from 'modules/domain/order-manager/entities/order.mock'
import { productMock } from 'modules/domain/product-manager/entities/product.mock'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { routes } from 'routes'

const getStatusColor = (status: keyof typeof OrderStatus) => {
    switch (status) {
        case 'pending':
            return 'amber' as const
        case 'approved':
            return 'blue' as const
        case 'processing':
            return 'blue' as const
        case 'shipped':
            return 'indigo' as const
        case 'delivered':
            return 'green' as const
        case 'cancelled':
            return 'red' as const
        case 'refunded':
            return 'zinc' as const
        default:
            return 'zinc' as const
    }
}

const getPaymentStatusColor = (status: keyof typeof PaymentStatus) => {
    switch (status) {
        case 'pending':
            return 'amber' as const
        case 'awaiting_approval':
            return 'blue' as const
        case 'paid':
            return 'green' as const
        case 'failed':
            return 'red' as const
        case 'refunded':
            return 'zinc' as const
        default:
            return 'zinc' as const
    }
}

const OrderStatusBadge = ({
    order,
}: {
    order: Pick<Order, 'status' | 'paymentStatus'>
}) => {
    if (order.status === OrderStatus.pending) {
        return (
            <Badge color={getPaymentStatusColor(order.paymentStatus)} className="text-xs">
                Payment {removeUnderscores(order.paymentStatus).toLowerCase()}
            </Badge>
        )
    }

    return <Badge color={getStatusColor(order.status)}>{capitalize(order.status)}</Badge>
}

const OrderCard = ({ order }: { order: Order }) => {
    return (
        <div className="group relative rounded-2xl border-1 border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-4">
                        <div>
                            <Heading level={3} className="!text-lg font-semibold">
                                Order #{order.orderNumber}
                            </Heading>
                            <Text className="text-sm text-zinc-500 dark:text-zinc-400">
                                Ordered on{' '}
                                {order.createdAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </Text>
                        </div>

                        <div className="space-y-2">
                            <OrderStatusBadge order={order} />
                            {order.trackingNumber && (
                                <div className="space-y-1">
                                    <Text className="font-medium text-zinc-600 dark:text-zinc-300">
                                        Tracking:
                                    </Text>
                                    <Text className="font-mono text-sm">
                                        {order.trackingNumber}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-4">
                        <div className="flex gap-4">
                            {order.items.length > 3 && (
                                <div className="relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                    <Text className="text-sm">
                                        +{order.items.length - 3}
                                    </Text>
                                </div>
                            )}
                            {order.items.slice(0, 3).map(item => (
                                <div
                                    key={item.productId}
                                    className="relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
                                >
                                    <Image
                                        src={productMock.images[0]}
                                        alt={productMock.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                        <Button href={routes.orders({ id: order.id })}>View Order</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrdersPageInner = ({
    isLoading,
    orders,
}: {
    isLoading: boolean
    orders: Order[]
}) => {
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)
    const [statusFilter, setStatusFilter] = useState<keyof typeof OrderStatus | 'all'>(
        'all',
    )

    useEffect(() => {
        if (statusFilter === 'all') {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter(order => order.status === statusFilter))
        }
    }, [orders, statusFilter])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100"></div>
                    <Text className="mt-4">Loading your orders...</Text>
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                    <Text className="mb-2 text-xl font-semibold">No orders yet</Text>
                    <Text className="mb-6 text-zinc-500 dark:text-zinc-400">
                        When you place your first order, it will appear here.
                    </Text>
                    <Button href="/">Start Shopping</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <Heading className="mb-2 !text-2xl" level={2}>
                    My Orders
                </Heading>
                {/* <div className="flex gap-2">
                    <Button size="sm" onClick={() => setStatusFilter('all')}>
                        All ({orders.length})
                    </Button>
                    <Button size="sm" onClick={() => setStatusFilter('pending')}>
                        Pending ({orders.filter(o => o.status === 'pending').length})
                    </Button>
                    <Button size="sm" onClick={() => setStatusFilter('delivered')}>
                        Delivered ({orders.filter(o => o.status === 'delivered').length})
                    </Button>
                </div> */}
            </div>

            <div className="space-y-4">
                {filteredOrders.map(order => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>

            {filteredOrders.length === 0 && statusFilter !== 'all' && (
                <div className="py-8 text-center">
                    <Text className="text-zinc-500 dark:text-zinc-400">
                        No orders found with status: {statusFilter}
                    </Text>
                </div>
            )}
        </div>
    )
}
// Mock orders data - in a real app, this would come from an API
const mockOrders: Order[] = [
    {
        ...orderMock,
        id: '1',
        orderNumber: 'VND001',
        total: 129.99,
        subtotal: 119.99,
        tax: 10.0,
        status: OrderStatus.delivered,
        paymentStatus: PaymentStatus.paid,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        trackingNumber: 'TRK123456789',
        items: [
            {
                productId: 'prod-1',
                quantity: 2,
                price: 59.99,
                total: 119.98,
                vendorId: 'vendor-1',
                attributes: { size: 'M', color: 'Blue' },
            },
            {
                productId: 'prod-4',
                quantity: 2,
                price: 59.99,
                total: 119.98,
                vendorId: 'vendor-1',
                attributes: { size: 'M', color: 'Blue' },
            },
            {
                productId: 'prod-5',
                quantity: 2,
                price: 59.99,
                total: 119.98,
                vendorId: 'vendor-1',
                attributes: { size: 'M', color: 'Blue' },
            },
            {
                productId: 'prod-6',
                quantity: 2,
                price: 59.99,
                total: 119.98,
                vendorId: 'vendor-1',
                attributes: { size: 'M', color: 'Blue' },
            },
        ],
    },
    {
        ...orderMock,
        id: '2',
        orderNumber: 'VND002',
        total: 89.5,
        subtotal: 79.5,
        tax: 10.0,
        status: OrderStatus.shipped,
        paymentStatus: PaymentStatus.paid,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-22'),
        trackingNumber: 'TRK987654321',
        items: [
            {
                productId: 'prod-2',
                quantity: 1,
                price: 79.5,
                total: 79.5,
                vendorId: 'vendor-1',
                attributes: { size: 'L', color: 'Red' },
            },
        ],
    },
    {
        ...orderMock,
        id: '3',
        orderNumber: 'VND003',
        total: 45.99,
        subtotal: 39.99,
        tax: 6.0,
        status: OrderStatus.pending,
        paymentStatus: PaymentStatus.awaiting_approval,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
        items: [
            {
                productId: 'prod-3',
                quantity: 1,
                price: 39.99,
                total: 39.99,
                vendorId: 'vendor-2',
                attributes: { size: 'S', color: 'Green' },
            },
        ],
    },
]

export const OrdersPage = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return <OrdersPageInner isLoading={isLoading} orders={mockOrders} />
}
