'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from 'modules/infrastructure/api/trpc/client'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: `${process.env.appUrl}/api/trpc` })],
        }),
    )

    return (
        <SessionProvider>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </trpc.Provider>
        </SessionProvider>
    )
}
