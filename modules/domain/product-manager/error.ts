import { Data } from 'effect'

export class ProductManagerError extends Data.TaggedError('ProductManagerError')<{
    message: string
    cause?: unknown
}> {}
