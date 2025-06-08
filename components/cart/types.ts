import { z } from 'zod'

export const CartItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    variant: z.string().optional(),
    price: z.number(),
    originalPrice: z.number().optional(),
    discountPercentage: z.number().optional(),
    image: z.string().optional(),
    quantity: z.number().default(1),
})

export const StoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
    rating: z.number(),
    reviewCount: z.number(),
    isOnline: z.boolean(),
    items: z.array(CartItemSchema),
    shippingCost: z.number(),
    shippingTime: z.string(),
    totalAmount: z.number(),
})

export const ChatMessageSchema = z.object({
    id: z.string(),
    type: z.enum(['system', 'vendor', 'user']),
    content: z.string(),
    timestamp: z.date(),
    orderId: z.string().optional(),
    orderSummary: z
        .object({
            items: z.array(CartItemSchema),
            totalAmount: z.number(),
            status: z.enum(['pending', 'approved', 'unavailable']),
        })
        .optional(),
    paymentInfo: z
        .object({
            bankName: z.string(),
            accountName: z.string(),
            accountNumber: z.string(),
            sortCode: z.string(),
            reference: z.string(),
            amount: z.number(),
        })
        .optional(),
})

export const CartSummarySchema = z.object({
    itemsTotal: z.number(),
    shopDiscount: z.number(),
    shipping: z.number(),
    total: z.number(),
    itemCount: z.number(),
})

export type CartItem = z.infer<typeof CartItemSchema>
export type Store = z.infer<typeof StoreSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>
export type CartSummary = z.infer<typeof CartSummarySchema>
