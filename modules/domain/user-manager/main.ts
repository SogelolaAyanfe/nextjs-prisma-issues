import { UserManagerError } from 'modules/domain/user-manager/error'
import { Effect, Layer } from 'effect'
import { UserManager } from 'modules/domain/user-manager/interface'
import { UserRepository } from 'modules/domain/user-manager/repositories/user.interface'

export const UserManagerLayer = Layer.effect(
    UserManager,
    Effect.gen(function* () {
        const userRepository = yield* UserRepository

        const selectMany: UserManager['selectMany'] = () =>
            userRepository
                .selectMany({
                    where: {
                        id: '1',
                    },
                })
                .pipe(
                    Effect.catchAll(
                        error =>
                            new UserManagerError({
                                error,
                                message: 'Unable to fetch all users',
                            }),
                    ),
                    Effect.withSpan('UserManager.selectMany'),
                )

        testError: return UserManager.of({
            selectMany,
        })
    }),
)
