import { Data } from 'effect'

export class DiscountManagerError extends Data.TaggedError('DiscountManagerError')<{
    message: string
    cause?: unknown
}> {}
