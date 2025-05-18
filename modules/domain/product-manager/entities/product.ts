import { z } from 'zod'

export const ProductAvailabilityStatusEnum = z.enum([
    'IN_STOCK',
    'LOW_STOCK',
    'LIMITED_AVAILABILITY',
])

export type ProductAvailabilityStatus = z.infer<typeof ProductAvailabilityStatusEnum>

export const ProductStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
export type ProductStatus = z.infer<typeof ProductStatusEnum>

export const ProductSchema = z.object({
    id: z.string(),
    vendorId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    discountedPrice: z.number().positive().nullable(),
    images: z.array(z.string().url()),
    categoryId: z.string(),
    attributes: z.record(z.string()),
    stock: z.number().int().nonnegative(),
    sku: z.string(),
    status: ProductStatusEnum.default('DRAFT'),
    availabilityStatus: ProductAvailabilityStatusEnum.default('IN_STOCK'),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string(),
})

export type Product = z.infer<typeof ProductSchema>
