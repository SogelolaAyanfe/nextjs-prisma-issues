import { z } from 'zod'

export const OrderItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
    total: z.number().nonnegative(),
})

export const ShippingAddressSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
    phone: z.string(),
})

export const OrderStatus = {
    pending: 'pending',
    approved: 'approved',
    processing: 'processing',
    shipped: 'shipped',
    delivered: 'delivered',
    cancelled: 'cancelled',
    refunded: 'refunded',
} as const

export const PaymentStatus = {
    pending: 'pending',
    awaiting_approval: 'awaiting_approval',
    paid: 'paid',
    failed: 'failed',
    refunded: 'refunded',
} as const

export const OrderStatusSchema = z.enum([
    OrderStatus.pending,
    OrderStatus.approved,
    OrderStatus.processing,
    OrderStatus.shipped,
    OrderStatus.delivered,
    OrderStatus.cancelled,
    OrderStatus.refunded,
])
export const PaymentStatusSchema = z.enum([
    PaymentStatus.pending,
    PaymentStatus.awaiting_approval,
    PaymentStatus.paid,
    PaymentStatus.failed,
    PaymentStatus.refunded,
])

export const OrderSchema = z.object({
    id: z.string(),
    userId: z.string(),
    vendorId: z.string(),
    cartId: z.string(),
    items: z.array(OrderItemSchema),
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    discount: z.number().nonnegative(),
    total: z.number().nonnegative(),
    status: OrderStatusSchema,
    paymentStatus: PaymentStatusSchema,
    shippingAddress: ShippingAddressSchema,
    trackingNumber: z.string().optional(),
    notes: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    orderNumber: z.string(), // human-friendly identifier
})

export type OrderItem = z.infer<typeof OrderItemSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
export type Order = z.infer<typeof OrderSchema>

export const PENDING_AND_AWAITING_APPROVAL_PAYMENT_STATUS = [
    PaymentStatus.pending,
    PaymentStatus.awaiting_approval,
] as const
