import { Cart, CartItem } from 'modules/domain/cart-manager/entities/cart'

const mockCartItem: CartItem = {
    productId: 'product-1',
    quantity: 1,
    price: 100,
    total: 100,
    vendorId: '1',
    attributes: {
        size: 'M',
        color: 'Red',
    },
}

export const mockCart: Cart = {
    id: 'cart-1',
    userId: 'user-1',
    vendorId: 'vendor-1',
    items: [mockCartItem, { ...mockCartItem, productId: 'product-2', quantity: 2 }],
    subtotal: 200,
    savedForLater: [],
    createdAt: new Date(),
    updatedAt: new Date(),
}
