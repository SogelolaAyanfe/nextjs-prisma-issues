import { auth } from 'auth'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="flex flex-col gap-12">
            <FeaturedProducts />
        </div>
    )
}

export default Home
