import { auth } from 'auth'
import { AppShell } from 'components/app-shell'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <AppShell>
            <h1 className="text-4xl font-bold">Welcome to the App</h1>
        </AppShell>
    )
}

export default Home
