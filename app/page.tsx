import { auth } from 'auth'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-8"></main>
    )
}

export default Home
