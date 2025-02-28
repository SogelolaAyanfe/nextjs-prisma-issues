import { Effect, Context } from 'effect'
import { Order } from 'modules/domain/order-manager/entities'
import { OrderManagerError } from 'modules/domain/order-manager/error'

export type OrderManager = {
    fetchAll: (args: {}) => Effect.Effect<Order[], OrderManagerError>
    fetchById: (args: { id: string }) => Effect.Effect<Order, OrderManagerError>
    fetchByUser: (args: { userId: string }) => Effect.Effect<Order[], OrderManagerError>
    create: (args: {
        order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'paymentStatus'>
    }) => Effect.Effect<Order, OrderManagerError>
    updateStatus: (args: {
        id: string
        status: Order['status']
    }) => Effect.Effect<Order, OrderManagerError>
    updatePaymentStatus: (args: {
        id: string
        paymentStatus: Order['paymentStatus']
    }) => Effect.Effect<Order, OrderManagerError>
    updateTrackingNumber: (args: {
        id: string
        trackingNumber: string
    }) => Effect.Effect<Order, OrderManagerError>
    cancel: (args: { id: string }) => Effect.Effect<Order, OrderManagerError>
    refund: (args: { id: string }) => Effect.Effect<Order, OrderManagerError>
}

export const OrderManager = Context.GenericTag<OrderManager>('order-manager')
