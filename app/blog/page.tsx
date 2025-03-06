import { pipe, Effect } from 'effect'
import { appRunPromise } from 'modules/infrastructure/runtime'
import { UserManager, UserManagerLayerLive } from 'modules/domain/user-manager'

export default async function Blog() {
    const users = await appRunPromise(
        pipe(
            UserManager,
            Effect.andThen(_ => _.selectMany({})),
            Effect.provide(UserManagerLayerLive),
        ),
    )

    return (
        <div>
            <h1>Blog</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    )
}
