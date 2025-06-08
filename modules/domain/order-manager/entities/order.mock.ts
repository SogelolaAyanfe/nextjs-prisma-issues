import {
    Order,
    OrderStatus,
    PaymentStatus,
} from 'modules/domain/order-manager/entities/order'

export const orderMock: Order = {
    id: '1',
    userId: '1',
    vendorId: '1',
    cartId: '1',
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    status: OrderStatus.pending,
    paymentStatus: PaymentStatus.pending,
    shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'US',
        postalCode: '12345',
        phone: '1234567890',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: 'VND001',
}
