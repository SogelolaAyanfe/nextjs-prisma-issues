import { usersRouter } from 'modules/domain/users/router'
import { postsRouter } from '@/modules/domain/posts/router'
import { router } from 'modules/infrastructure/api/trpc/server'



// routers go here
export const AppRouter = router({
    users: usersRouter,
    posts: postsRouter,
})

export type AppRouter = typeof AppRouter
