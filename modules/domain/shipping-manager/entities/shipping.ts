export type ShippingMethod = {
    id: string
    name: string
    description: string
    price: number
    estimatedDeliveryDays: number
    isActive: boolean
}

export type ShippingZone = {
    id: string
    name: string
    countries: string[]
    regions: string[]
}

export type ShippingRate = {
    id: string
    shippingMethodId: string
    shippingZoneId: string
    price: number
}

export type Shipment = {
    id: string
    orderId: string
    trackingNumber: string
    carrier: string
    status: 'pending' | 'shipped' | 'delivered' | 'failed'
    shippingMethodId: string
    estimatedDeliveryDate: Date
    actualDeliveryDate?: Date
    createdAt: Date
    updatedAt: Date
}
