import { usersRouter } from 'modules/domain/users/router'
import { router } from 'modules/infrastructure/api/trpc/server'

// routers go here
export const AppRouter = router({
    users: usersRouter,
})

export type AppRouter = typeof AppRouter
