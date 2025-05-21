import { auth } from 'auth'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return <div className="flex flex-col gap-12"></div>
}

export default Home
