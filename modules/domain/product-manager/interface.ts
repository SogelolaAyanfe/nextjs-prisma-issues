import { Effect, Context } from 'effect'
import { Product } from 'modules/domain/product-manager/entities'
import { ProductManagerError } from 'modules/domain/product-manager/error'

export type ProductManager = {
    fetchAll: () => Effect.Effect<Product[], ProductManagerError>
    fetchById: (id: string) => Effect.Effect<Product, ProductManagerError>
    fetchByVendor: (vendorId: string) => Effect.Effect<Product[], ProductManagerError>
    fetchByCategory: (categoryId: string) => Effect.Effect<Product[], ProductManagerError>
    create: (
        product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<Product, ProductManagerError>
    update: (
        id: string,
        product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>,
    ) => Effect.Effect<Product, ProductManagerError>
    updateStock: (
        id: string,
        stock: number,
    ) => Effect.Effect<Product, ProductManagerError>
    updateStatus: (
        id: string,
        status: Product['status'],
    ) => Effect.Effect<Product, ProductManagerError>
    delete: (id: string) => Effect.Effect<void, ProductManagerError>
}

export const ProductManager = Context.GenericTag<ProductManager>('product-manager')
