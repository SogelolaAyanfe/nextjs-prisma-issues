import { auth } from 'auth'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { AppShell } from 'components/app-shell'
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
