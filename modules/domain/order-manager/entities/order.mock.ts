import {
    Order,
    OrderStatus,
    PaymentStatus,
} from 'modules/domain/order-manager/entities/order'
import { productMock } from 'modules/domain/product-manager/entities/product.mock'

export const orderMock: Order = {
    id: '1',
    userId: '1',
    vendorId: '1',
    cartId: '1',
    items: [
        {
            productId: productMock.id,
            quantity: 2,
            price: 100,
            total: 200,
            vendorId: '1',
            attributes: { color: 'Blue', size: 'M' },
        },
        {
            productId: 'product-2',
            quantity: 1,
            price: 150,
            total: 150,
            vendorId: '1',
            attributes: { color: 'Black', size: 'L' },
        },
    ],
    subtotal: 350,
    tax: 20,
    shipping: 10,
    discount: 0,
    total: 380,
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
    trackingNumber: 'TRACK123456',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: 'VND001',
}
