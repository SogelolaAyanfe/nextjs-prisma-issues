import { Effect, Context } from 'effect'
import { EffectError } from 'lib/effect/error'
import { Prisma } from '@prisma/client'
import { User } from 'modules/domain/user-manager/entities'
import { FindResult } from 'modules/domain/common/repository-types'

export class UserRepositoryError extends EffectError('UserRepositoryError') {}

export type UserRepository = {
    selectMany: <T extends Pick<Prisma.UserFindManyArgs, 'where' | 'select'>>(
        args: T,
    ) => Effect.Effect<FindResult<User, T['select']>[], UserRepositoryError>
}

export const UserRepository = Context.GenericTag<UserRepository>('user-repository')
