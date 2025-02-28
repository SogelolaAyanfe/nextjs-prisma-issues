import { Data } from 'effect'

export class ShippingManagerError extends Data.TaggedError('ShippingManagerError')<{
    message: string
    cause?: unknown
}> {}
