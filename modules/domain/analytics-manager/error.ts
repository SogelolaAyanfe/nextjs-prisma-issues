import { Data } from 'effect'

export class AnalyticsManagerError extends Data.TaggedError('AnalyticsManagerError')<{
    message: string
    cause?: unknown
}> {}
