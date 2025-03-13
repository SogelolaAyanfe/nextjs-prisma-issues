import { generateMock } from '@anatine/zod-mock'
import { OrderSchema } from 'modules/domain/order-manager/entities/order'

export const orderMock = generateMock(OrderSchema)
