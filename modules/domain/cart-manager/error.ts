import { Data } from 'effect'

export class CartManagerError extends Data.TaggedError('CartManagerError')<{
    message: string
    cause?: unknown
}> {}
