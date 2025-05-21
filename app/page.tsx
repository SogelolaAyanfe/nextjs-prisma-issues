import { auth } from 'auth'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return <FeaturedProducts />
}

export default Home
