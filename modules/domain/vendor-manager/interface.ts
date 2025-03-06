import { Effect, Context } from 'effect'
import { Vendor } from 'modules/domain/vendor-manager/entities'
import { VendorManagerError } from 'modules/domain/vendor-manager/error'

export type VendorManager = {
    selectMany: (args: {}) => Effect.Effect<Vendor[], VendorManagerError>
    fetchById: (args: { id: string }) => Effect.Effect<Vendor, VendorManagerError>
    create: (args: {
        vendor: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt' | 'status'>
    }) => Effect.Effect<Vendor, VendorManagerError>
    update: (args: {
        id: string
        vendor: Partial<Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>>
    }) => Effect.Effect<Vendor, VendorManagerError>
    updateStatus: (args: {
        id: string
        status: Vendor['status']
    }) => Effect.Effect<Vendor, VendorManagerError>
}

export const VendorManager = Context.GenericTag<VendorManager>('vendor-manager')
