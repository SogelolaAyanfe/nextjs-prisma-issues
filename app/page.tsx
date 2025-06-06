import { auth } from 'auth'
import { AppShell } from 'components/app-shell'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <AppShell>
            <FeaturedProducts />
        </AppShell>
    )
}

export default Home
