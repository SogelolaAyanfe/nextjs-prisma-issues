import { Data } from 'effect'

export class VendorManagerError extends Data.TaggedError('VendorManagerError')<{
    message: string
    cause?: unknown
}> {}
