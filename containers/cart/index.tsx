'use client'

import { CartItems } from 'blocks/cart/cart-items'
import { Badge } from 'components/badge'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Divider } from 'components/divider'
import { Field, Label } from 'components/fieldset'
import { Heading } from 'components/heading'
import { Input } from 'components/input'
import { Select } from 'components/select'
import { Text } from 'components/text'
import { format } from 'lib/money'
import { Cart, mockCart } from 'modules/domain/cart-manager/entities'
import { Order, OrderStatus, PaymentStatus } from 'modules/domain/order-manager/entities'
import { orderMock } from 'modules/domain/order-manager/entities/order.mock'
import { vendorMock } from 'modules/domain/vendor-manager/entities/vendor.mock'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { routes } from 'routes'

const Checkout = ({ cart }: { cart: Pick<Cart, 'subtotal' | 'id'> }) => {
    const [order, setOrder] = useState<Order | null>(null)
    const router = useRouter()

    // simulate change order status to approved when order status is pending
    useEffect(() => {
        if (order?.status === OrderStatus.pending) {
            setTimeout(() => setOrder({ ...order, status: OrderStatus.approved }), 1000)
        }
    }, [order])

    // simulate change order status to shipped when order status is approved
    useEffect(() => {
        if (
            order?.status === OrderStatus.approved &&
            order.paymentStatus === PaymentStatus.awaiting_approval
        ) {
            setTimeout(() => {
                setOrder({ ...order, status: OrderStatus.processing })
                // redirect to cart page with refresh
                router.replace(routes.cart(), {
                    scroll: false,
                })
            }, 5000)
        }
    }, [order])

    if (
        order?.status === OrderStatus.approved &&
        order.paymentStatus === PaymentStatus.awaiting_approval
    ) {
        return (
            <div className="flex flex-col gap-4">
                <Text className="font-bold">Thank you for your payment</Text>
                <Text>Your order is being processed.</Text>
            </div>
        )
    }

    if (
        order?.status === OrderStatus.approved &&
        (order.paymentStatus === PaymentStatus.pending ||
            order.paymentStatus === PaymentStatus.awaiting_approval)
    ) {
        return (
            <div className="flex flex-col gap-4">
                <Text className="font-bold">Make payment</Text>
                <Text>Please make a payment to the following bank account:</Text>
                <Card className="bg-zinc-100 !py-4 dark:!bg-zinc-800">
                    <Text className="!text-base/8">
                        <strong>Bank Name:</strong> {vendorMock.bankDetails.bankName}
                        <br />
                        <strong>Account Name:</strong>{' '}
                        {vendorMock.bankDetails.accountName}
                        <br />
                        <strong>Account Number:</strong>{' '}
                        {vendorMock.bankDetails.accountNumber}
                        <br />
                        <strong>Sort Code:</strong> {vendorMock.bankDetails.sortCode}
                    </Text>
                </Card>
                <Badge color="orange" className="!text-md !p-4">
                    Add this reference to your payment:{' '}
                    <strong>{order.orderNumber}</strong>
                </Badge>
                <Button
                    color="blue"
                    size="lg"
                    className="mt-4"
                    onClick={() =>
                        setOrder({
                            ...order,
                            paymentStatus: PaymentStatus.awaiting_approval,
                        })
                    }
                >
                    Confirm payment
                </Button>
            </div>
        )
    }

    if (order?.status === OrderStatus.pending) {
        return (
            <div className="flex flex-col gap-4">
                <Text className="font-bold">Order pending</Text>
                <Text>
                    Vendor is reviewing your order. You will be notified when it is
                    approved.
                </Text>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Text className="font-bold">How you'll pay</Text>
                    <Text>You can pay with a bank transfer.</Text>
                </div>
                <Divider />
                <div className="flex flex-col gap-4">
                    <Text className="font-bold">Delivery address</Text>
                    <div className="flex flex-col gap-4">
                        <Field>
                            <Label>Street Address</Label>
                            <Input />
                        </Field>
                        <div className="flex w-full gap-4">
                            <Field className="flex-1">
                                <Label>City</Label>
                                <Select>
                                    <option value="London">London</option>
                                    <option value="Manchester">Manchester</option>
                                    <option value="Birmingham">Birmingham</option>
                                </Select>
                            </Field>
                            <Field className="flex-1">
                                <Label>Postcode</Label>
                                <Input />
                            </Field>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="flex justify-between">
                    <Text className="!text-base/6 font-bold">Items Total</Text>
                    <Text className="!text-base/6 font-bold">
                        {format(cart.subtotal)}
                    </Text>
                </div>
                <Button
                    color="blue"
                    size="lg"
                    className="mt-4"
                    onClick={() => setOrder(orderMock)}
                >
                    Request payment
                </Button>
            </div>
        )
    }

    return null
}

const CartPageInner = ({ isLoading, carts }: { isLoading: boolean; carts: Cart[] }) => {
    const [selectedCart, setSelectedCart] = useState<Cart | null>(carts[0])

    const handleCartSelect = (cartId: string) => {
        setSelectedCart(carts.find(cart => cart.id === cartId) || null)
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100"></div>
                    <Text className="mt-4">Loading your cart...</Text>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <Heading className="mb-2 !text-2xl" level={2}>
                Cart
            </Heading>
            <div className="flex flex-col gap-24 bg-zinc-50 lg:flex-row dark:bg-zinc-900">
                <div className="flex flex-col lg:flex-1/3">
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-4">
                            {carts.map(cart => (
                                <CartItems
                                    key={cart.id}
                                    items={cart.items}
                                    isSelected={selectedCart?.id === cart.id}
                                    onClick={() => handleCartSelect(cart.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sticky top-[80px] flex-col lg:flex-1">
                    {selectedCart && <Checkout cart={selectedCart} />}
                </div>
            </div>
        </div>
    )
}

export const CartPage = () => {
    const carts = [
        mockCart,
        {
            ...mockCart,
            id: 'cart-2',
            vendorId: 'vendor-2',
            items: [
                {
                    ...mockCart.items[0],
                    productId: 'product-2',
                },
            ],
        },
    ]
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return <CartPageInner isLoading={isLoading} carts={carts} />
}
