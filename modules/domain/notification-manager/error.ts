import { Data } from 'effect'

export class NotificationManagerError extends Data.TaggedError(
    'NotificationManagerError',
)<{
    message: string
    cause?: unknown
}> {}
