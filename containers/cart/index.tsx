'use client'

import { Badge } from 'components/badge'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { CartItemGroup } from 'components/cart/cart-item-group'
import type {
    CartSummary as CartSummaryType,
    ChatMessage,
    Store,
} from 'components/cart/types'
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
import { useEffect, useState } from 'react'

// Mock data - In a real app, this would come from API calls or context
const mockStores: Store[] = [
    {
        id: 'fellilove',
        name: 'FellloveShop',
        avatar: 'FL',
        rating: 4.9,
        reviewCount: 65,
        isOnline: true,
        shippingCost: 4.31,
        shippingTime: 'Get it by Jun 24-Jul 18',
        totalAmount: 8.62,
        items: [
            {
                id: 'item1',
                name: 'Keychain Cat Custom, Pet Keychain, Personalized...',
                variant: 'Style: Body',
                price: 4.31,
                originalPrice: 12.31,
                discountPercentage: 65,
                quantity: 1,
            },
        ],
    },
    {
        id: 'euniceet',
        name: 'EuniceetsyShop',
        avatar: 'ES',
        rating: 4.9,
        reviewCount: 960,
        isOnline: true,
        shippingCost: 4.62,
        shippingTime: 'Get it by Jun 24-Jul 18',
        totalAmount: 9.73,
        items: [
            {
                id: 'item2',
                name: 'Custom Cat Keychain, Pet Portrait Keychain, Pers...',
                variant: 'Style: Head',
                price: 5.11,
                originalPrice: 12.78,
                discountPercentage: 60,
                quantity: 1,
            },
        ],
    },
    {
        id: 'fellfrfrilove',
        name: 'FelliloveShop',
        avatar: 'FL',
        rating: 4.9,
        reviewCount: 960,
        isOnline: true,
        shippingCost: 4.62,
        shippingTime: 'Get it by Jun 24-Jul 18',
        totalAmount: 9.73,
        items: [
            {
                id: 'item2',
                name: 'Custom Cat Keychain, Pet Portrait Keychain, Pers...',
                variant: 'Style: Head',
                price: 5.11,
                originalPrice: 12.78,
                discountPercentage: 60,
                quantity: 1,
            },
        ],
    },
]

const mockCartSummary: CartSummaryType = {
    itemsTotal: 25.1,
    shopDiscount: 15.68,
    shipping: 8.93,
    total: 18.35,
    itemCount: 2,
}

const mockChatMessages: Record<string, ChatMessage[]> = {
    fellilove: [
        {
            id: '1',
            type: 'system',
            content: 'New order received • Checking availability...',
            timestamp: new Date(),
        },
        {
            id: '2',
            type: 'vendor',
            content:
                "Hi there! 👋 Thanks for choosing FellloveShop. I've received your order and I'm checking our availability right now.",
            timestamp: new Date(),
        },
        {
            id: '3',
            type: 'vendor',
            content:
                "Great news! Your custom pet keychain is available and ready to make:\n\nI'll need a clear photo of your pet to create the custom keychain. Could you upload it? 📸",
            timestamp: new Date(),
            orderSummary: {
                items: [
                    {
                        id: 'item1',
                        name: 'Keychain Cat Custom, Pet Keychain',
                        variant: 'Style: Body',
                        price: 4.31,
                        quantity: 1,
                    },
                ],
                totalAmount: 4.31,
                status: 'approved' as const,
            },
        },
        {
            id: '4',
            type: 'user',
            content:
                "Yes, please! I'll upload the photo. How should I proceed with payment?",
            timestamp: new Date(),
        },
        {
            id: '5',
            type: 'vendor',
            content:
                "Perfect! Here are the payment details:\n\nOnce payment is confirmed, I'll start crafting your beautiful keychain! 🎨",
            timestamp: new Date(),
            paymentInfo: {
                bankName: 'Craft Bank Ltd',
                accountName: 'FellloveShop',
                accountNumber: '4567-8901-2345',
                sortCode: '12-34-56',
                reference: 'FL-MP-2025-001',
                amount: 4.31,
            },
        },
    ],
    euniceet: [
        {
            id: '6',
            type: 'system',
            content: 'New order received • Processing custom request...',
            timestamp: new Date(),
        },
        {
            id: '7',
            type: 'vendor',
            content:
                "Hello! 💕 Welcome to EuniceetsyShop! I'm Sarah and I'll be handling your order personally.",
            timestamp: new Date(),
        },
        {
            id: '8',
            type: 'vendor',
            content:
                'Your custom cat keychain order looks perfect:\n\nThe "Head" style is one of my bestsellers! 🌟 Do you have any color preferences for the background?',
            timestamp: new Date(),
            orderSummary: {
                items: [
                    {
                        id: 'item2',
                        name: 'Custom Cat Keychain, Pet Portrait',
                        variant: 'Style: Head',
                        price: 5.11,
                        quantity: 1,
                    },
                ],
                totalAmount: 5.11,
                status: 'approved' as const,
            },
        },
        {
            id: '9',
            type: 'user',
            content: "I'd love a soft blue background if possible!",
            timestamp: new Date(),
        },
        {
            id: '10',
            type: 'vendor',
            content:
                "Soft blue will look absolutely gorgeous! 💙\n\nExpected completion: 3-4 business days. I'll send progress photos! ✨",
            timestamp: new Date(),
            paymentInfo: {
                bankName: 'Creative Bank',
                accountName: 'EuniceetsyShop Ltd',
                accountNumber: '8765-4321-0987',
                sortCode: '98-76-54',
                reference: 'ES-MP-2025-001',
                amount: 5.11,
            },
        },
    ],
    fellfrfrilove: [
        {
            id: '11',
            type: 'system',
            content: 'New order received • Checking availability...',
            timestamp: new Date(),
        },
    ],
}
type CartPageInnerProps = {
    stores: Store[]
    isLoading: boolean
    onStoreSelect: (storeId: string) => void
}

const Checkout = ({ cart }: { cart: Pick<Cart, 'subtotal'> }) => {
    const [order, setOrder] = useState<Order | null>(null)

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
            setTimeout(() => setOrder({ ...order, status: OrderStatus.processing }), 5000)
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

const CartPageInner = ({ stores, isLoading, onStoreSelect }: CartPageInnerProps) => {
    const [selectedStoreId, setSelectedStoreId] = useState<string | null>(stores[0].id)

    const handleStoreSelect = (storeId: string) => {
        setSelectedStoreId(storeId)
        onStoreSelect(storeId)
    }

    const selectedStore = stores.find(store => store.id === selectedStoreId)

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
                            {stores.map(store => (
                                <CartItemGroup
                                    key={store.id}
                                    items={store.items}
                                    isSelected={selectedStoreId === store.id}
                                    onClick={() => handleStoreSelect(store.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sticky top-[80px] flex-col lg:flex-1">
                    <Checkout cart={mockCart} />
                </div>
            </div>
        </div>
    )
}

export const CartPage = () => {
    const [stores] = useState<Store[]>(mockStores)
    const [cartSummary] = useState<CartSummaryType>(mockCartSummary)
    const [chatMessages, setChatMessages] =
        useState<Record<string, ChatMessage[]>>(mockChatMessages)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleStoreSelect = (storeId: string) => {
        // In a real app, this might trigger API calls to load chat history
        console.log('Selected store:', storeId)
    }

    return (
        <CartPageInner
            stores={stores}
            isLoading={isLoading}
            onStoreSelect={handleStoreSelect}
        />
    )
}
