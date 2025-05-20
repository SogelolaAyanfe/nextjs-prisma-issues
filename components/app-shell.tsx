'use client'

import { AppNavbar } from 'components/app-navbar'

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative isolate flex min-h-svh w-full flex-col bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
            {/* Navbar */}
            <AppNavbar />
            {/* Content */}
            <main className="flex flex-1 flex-col">
                <div className="grow p-6 lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </div>
            </main>
        </div>
    )
}
