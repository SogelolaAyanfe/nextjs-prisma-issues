import { z } from 'zod'

export const VendorStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    SUSPENDED: 'SUSPENDED',
} as const

export const VendorStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'])

export const VendorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    description: z.string().nullable(),
    logo: z.string().nullable(),
    banner: z.string().nullable(),
    status: VendorStatusSchema,
    address: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Vendor = z.infer<typeof VendorSchema>
