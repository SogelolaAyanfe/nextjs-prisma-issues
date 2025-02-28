import { Data } from 'effect'

export class PaymentManagerError extends Data.TaggedError('PaymentManagerError')<{
    message: string
    cause?: unknown
}> {}
