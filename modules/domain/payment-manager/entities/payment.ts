import { z } from 'zod'

export const PaymentMethodEnum = z.enum([
    'credit_card',
    'paypal',
    'bank_transfer',
    'crypto',
    'cash_on_delivery',
])

export const PaymentSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    amount: z.number().positive(),
    method: PaymentMethodEnum,
    status: z.enum(['pending', 'completed', 'failed', 'refunded']),
    transactionId: z.string().optional(),
    gatewayResponse: z.record(z.unknown()).optional(),
    refundId: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const VendorPayoutSchema = z.object({
    id: z.string(),
    vendorId: z.string(),
    amount: z.number().positive(),
    status: z.enum(['pending', 'completed', 'failed']),
    paymentMethod: z.string(),
    reference: z.string(),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type PaymentMethod = z.infer<typeof PaymentMethodEnum>
export type Payment = z.infer<typeof PaymentSchema>
export type VendorPayout = z.infer<typeof VendorPayoutSchema>
