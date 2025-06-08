import { auth } from 'auth'
import { AppShell } from 'components/app-shell'
import { WishlistContainer } from 'containers/wishlist'
import { redirect } from 'next/navigation'

const WishlistPage = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <AppShell>
            <WishlistContainer />
        </AppShell>
    )
}

export default WishlistPage
