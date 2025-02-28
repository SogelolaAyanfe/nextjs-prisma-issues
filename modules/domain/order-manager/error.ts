import { Data } from 'effect'

export class OrderManagerError extends Data.TaggedError('OrderManagerError')<{
    message: string
    cause?: unknown
}> {}
