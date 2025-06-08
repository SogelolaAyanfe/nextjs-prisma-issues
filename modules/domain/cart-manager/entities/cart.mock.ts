import { Cart, CartItem } from 'modules/domain/cart-manager/entities/cart'

const mockCartItem: CartItem = {
    productId: '1',
    quantity: 1,
    price: 100,
    total: 100,
    vendorId: '1',
}

export const mockCart: Cart = {
    id: '1',
    userId: '1',
    vendorId: '1',
    items: [mockCartItem, { ...mockCartItem, productId: '2', quantity: 2 }],
    subtotal: 200,
    savedForLater: [],
    createdAt: new Date(),
    updatedAt: new Date(),
}
