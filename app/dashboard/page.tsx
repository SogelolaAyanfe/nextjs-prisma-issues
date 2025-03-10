import { auth } from 'auth'
import { Heading } from 'components/heading'
import { AnalyticsOverview } from 'modules/domain/analytics-manager/components/AnalyticsOverview'

const Home = async () => {
    const session = await auth()

    return (
        <>
            <Heading level={1} className="mb-8 text-2xl sm:text-3xl/8">
                Hi, {session?.user?.name}
            </Heading>
            <AnalyticsOverview />
        </>
    )
}

export default Home
