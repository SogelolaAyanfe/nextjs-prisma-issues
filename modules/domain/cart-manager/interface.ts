import { Effect, Context } from 'effect'
import { Cart, CartItem } from 'modules/domain/cart-manager/entities'
import { CartManagerError } from 'modules/domain/cart-manager/error'

export type CartManager = {
    getCart: (args: { userId: string }) => Effect.Effect<Cart, CartManagerError>
    addItem: (args: {
        userId: string
        productId: string
        quantity: number
        price: number
    }) => Effect.Effect<Cart, CartManagerError>
    updateItemQuantity: (args: {
        userId: string
        productId: string
        quantity: number
    }) => Effect.Effect<Cart, CartManagerError>
    removeItem: (args: {
        userId: string
        productId: string
    }) => Effect.Effect<Cart, CartManagerError>
    clearCart: (args: { userId: string }) => Effect.Effect<Cart, CartManagerError>
    saveForLater: (args: {
        userId: string
        productId: string
    }) => Effect.Effect<Cart, CartManagerError>
    moveToCart: (args: {
        userId: string
        productId: string
    }) => Effect.Effect<Cart, CartManagerError>
    checkout: (args: { userId: string }) => Effect.Effect<void, CartManagerError>
}

export const CartManager = Context.GenericTag<CartManager>('cart-manager')
