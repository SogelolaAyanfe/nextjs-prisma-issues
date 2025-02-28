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

export const OrderSchema = z.object({
    id: z.string(),
    userId: z.string(),
    items: z.array(OrderItemSchema),
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    discount: z.number().nonnegative(),
    total: z.number().nonnegative(),
    status: z.enum([
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
    ]),
    paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']),
    shippingAddress: ShippingAddressSchema,
    trackingNumber: z.string().optional(),
    notes: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
export type Order = z.infer<typeof OrderSchema>
