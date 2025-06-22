import { auth } from 'auth'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Home
