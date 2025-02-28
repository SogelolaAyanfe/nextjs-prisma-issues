import { z } from 'zod'

export const VendorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    description: z.string().nullable(),
    logo: z.string().nullable(),
    status: z.enum(['pending', 'approved', 'rejected', 'suspended']),
    commissionRate: z.number().min(0).max(100),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Vendor = z.infer<typeof VendorSchema>
