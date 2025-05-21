import { auth } from 'auth'
import { FeaturedProducts } from 'blocks/product/featured-products'
import { NewArrivals } from 'blocks/product/new-arrivals'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="flex flex-col gap-12">
            {/* <div className="flex">
                <div className="relative flex-1/4 rounded-xl bg-purple-500 p-6">
                    <Heading className="!text-[26px] !leading-[36px] font-bold dark:!text-white">
                        {vendorMock.description}
                    </Heading>
                </div>
                <div className="flex-1"></div>
            </div> */}
            <FeaturedProducts />
            <NewArrivals />
        </div>
    )
}

export default Home
