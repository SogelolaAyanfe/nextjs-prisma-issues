'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from 'modules/infrastructure/api/trpc/client'
import { SessionProvider } from 'next-auth/react'
import getConfig from 'next/config'
import { useState } from 'react'

const { publicRuntimeConfig } = getConfig()

const getLink = () => {
    if (typeof window === 'undefined') {
        return ''
    } else {
        return publicRuntimeConfig.APP_URL
    }
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: `${getLink()}/api/trpc` })],
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
