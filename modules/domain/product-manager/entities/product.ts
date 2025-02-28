import { z } from 'zod'

export const ProductSchema = z.object({
    id: z.string(),
    vendorId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    salePrice: z.number().positive().nullable(),
    images: z.array(z.string().url()),
    categoryId: z.string(),
    attributes: z.record(z.string()),
    stock: z.number().int().nonnegative(),
    sku: z.string(),
    status: z.enum(['draft', 'published', 'archived']),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Product = z.infer<typeof ProductSchema>
