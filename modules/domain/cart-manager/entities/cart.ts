import { z } from 'zod'

export const CartItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
    total: z.number().nonnegative(),
    vendorId: z.string(),
})

export const CartSchema = z.object({
    id: z.string(),
    userId: z.string(),
    vendorId: z.string(),
    items: z.array(CartItemSchema),
    subtotal: z.number().nonnegative(),
    savedForLater: z.array(CartItemSchema),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type CartItem = z.infer<typeof CartItemSchema>
export type Cart = z.infer<typeof CartSchema>
