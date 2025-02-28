import { Effect, Context } from 'effect'
import {
    Payment,
    PaymentMethod,
    VendorPayout,
} from 'modules/domain/payment-manager/entities'
import { PaymentManagerError } from 'modules/domain/payment-manager/error'

export type PaymentManager = {
    // Payment methods
    fetchPaymentMethods: (args: {}) => Effect.Effect<PaymentMethod[], PaymentManagerError>

    // Payments
    fetchPaymentById: (args: {
        id: string
    }) => Effect.Effect<Payment, PaymentManagerError>
    fetchPaymentsByOrder: (args: {
        orderId: string
    }) => Effect.Effect<Payment[], PaymentManagerError>
    processPayment: (args: {
        orderId: string
        amount: number
        method: PaymentMethod
    }) => Effect.Effect<Payment, PaymentManagerError>
    refundPayment: (args: {
        paymentId: string
    }) => Effect.Effect<Payment, PaymentManagerError>

    // Vendor payouts
    createVendorPayout: (args: {
        payout: Omit<VendorPayout, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    }) => Effect.Effect<VendorPayout, PaymentManagerError>
    fetchVendorPayouts: (args: {
        vendorId: string
    }) => Effect.Effect<VendorPayout[], PaymentManagerError>
    updatePayoutStatus: (args: {
        payoutId: string
        status: VendorPayout['status']
    }) => Effect.Effect<VendorPayout, PaymentManagerError>
}

export const PaymentManager = Context.GenericTag<PaymentManager>('payment-manager')
