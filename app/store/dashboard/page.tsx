import { auth } from 'auth'
import { Heading } from 'components/heading'
import { AnalyticsOverview } from 'modules/domain/analytics-manager/components/AnalyticsOverview'
import { OrderTable } from 'modules/domain/order-manager/components/OrderTable'
import { orderMock } from 'modules/domain/order-manager/entities/order.mock'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="flex flex-col gap-12">
            <Heading level={1} className="text-2xl sm:text-3xl/8">
                Hi, {session?.user?.name}
            </Heading>
            <div className="flex flex-col gap-24">
                <AnalyticsOverview />
                <OrderTable orders={[orderMock]} />
            </div>
        </div>
    )
}

export default Home
