import { Effect, Layer, pipe } from 'effect'
import {
    UserRepository,
    UserRepositoryError,
} from 'modules/domain/user-manager/repositories/user.interface'
import { PrismaClient } from 'modules/infrastructure/database/prisma-client/interface'
import { PrismaClientLayerLive } from 'modules/infrastructure/database/prisma-client'

export const UserRepositoryLayer = Layer.effect(
    UserRepository,
    Effect.gen(function* () {
        const prismaClient = yield* PrismaClient
 
        const selectMany: UserRepository['selectMany'] = args =>
            pipe(
                prismaClient.wrap(_ => _.user.findMany(args)),
                Effect.catchAll(
                    error =>
                        new UserRepositoryError({
                            error,
                            message: 'Unable to fetch all users',
                        }),
                ),
                Effect.withSpan('UserRepository.selectMany'),
            ) as any

        return UserRepository.of({
            selectMany,
        })
    }),
)

export const UserRepositoryLayerLive = UserRepositoryLayer.pipe(
    Layer.provide(PrismaClientLayerLive),
)
