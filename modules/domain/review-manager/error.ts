import { Data } from 'effect'

export class ReviewManagerError extends Data.TaggedError('ReviewManagerError')<{
    message: string
    cause?: unknown
}> {}
