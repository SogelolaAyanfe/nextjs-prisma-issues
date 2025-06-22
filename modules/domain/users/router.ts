import { publicProcedure, router } from 'modules/infrastructure/api/trpc/server'

export const usersRouter = router({
    list: publicProcedure.query(() => {
        return [
            {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
            {
                id: '2',
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
            },
        ]
    }),
})
