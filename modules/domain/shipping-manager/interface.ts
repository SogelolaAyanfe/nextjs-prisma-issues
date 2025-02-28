import { Effect, Context } from 'effect'
import {
    ShippingMethod,
    ShippingZone,
    ShippingRate,
    Shipment,
} from 'modules/domain/shipping-manager/entities'
import { ShippingManagerError } from 'modules/domain/shipping-manager/error'

export type ShippingManager = {
    // Shipping methods
    fetchShippingMethods: (args: {}) => Effect.Effect<
        ShippingMethod[],
        ShippingManagerError
    >
    createShippingMethod: (args: {
        method: Omit<ShippingMethod, 'id'>
    }) => Effect.Effect<ShippingMethod, ShippingManagerError>
    updateShippingMethod: (args: {
        id: string
        method: Partial<Omit<ShippingMethod, 'id'>>
    }) => Effect.Effect<ShippingMethod, ShippingManagerError>
    deleteShippingMethod: (args: {
        id: string
    }) => Effect.Effect<void, ShippingManagerError>

    // Shipping zones
    fetchShippingZones: (args: {}) => Effect.Effect<ShippingZone[], ShippingManagerError>
    createShippingZone: (args: {
        zone: Omit<ShippingZone, 'id'>
    }) => Effect.Effect<ShippingZone, ShippingManagerError>
    updateShippingZone: (args: {
        id: string
        zone: Partial<Omit<ShippingZone, 'id'>>
    }) => Effect.Effect<ShippingZone, ShippingManagerError>
    deleteShippingZone: (args: {
        id: string
    }) => Effect.Effect<void, ShippingManagerError>

    // Shipping rates
    fetchShippingRates: (args: {
        zoneId: string
    }) => Effect.Effect<ShippingRate[], ShippingManagerError>
    createShippingRate: (args: {
        rate: Omit<ShippingRate, 'id'>
    }) => Effect.Effect<ShippingRate, ShippingManagerError>
    updateShippingRate: (args: {
        id: string
        rate: Partial<Omit<ShippingRate, 'id'>>
    }) => Effect.Effect<ShippingRate, ShippingManagerError>
    deleteShippingRate: (args: {
        id: string
    }) => Effect.Effect<void, ShippingManagerError>

    // Shipments
    createShipment: (args: {
        shipment: Omit<Shipment, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    }) => Effect.Effect<Shipment, ShippingManagerError>
    updateShipmentStatus: (args: {
        id: string
        status: Shipment['status']
    }) => Effect.Effect<Shipment, ShippingManagerError>
    fetchShipmentByOrder: (args: {
        orderId: string
    }) => Effect.Effect<Shipment, ShippingManagerError>
    updateTrackingInfo: (args: {
        id: string
        trackingNumber: string
        carrier: string
    }) => Effect.Effect<Shipment, ShippingManagerError>

    // Shipping calculations
    calculateShippingCost: (args: {
        items: Array<{ weight: number; quantity: number }>
        countryCode: string
        regionCode: string
    }) => Effect.Effect<number, ShippingManagerError>
}

export const ShippingManager = Context.GenericTag<ShippingManager>('shipping-manager')
