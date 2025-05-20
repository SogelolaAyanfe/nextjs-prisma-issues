import { auth } from 'auth'
import { AppNavbar } from 'components/app-navbar'
import { redirect } from 'next/navigation'

const StoreHeader = () => {
    return (
        <div className="grow lg:bg-white lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            
        </div>
    )
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="relative isolate flex min-h-svh w-full flex-col bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
            <AppNavbar />
            <main className="flex flex-1 flex-col">
                <div className="grow lg:bg-white lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
                    <div className="mx-auto">{children}</div>
                </div>
            </main>
        </div>
    )
}

export default Layout
