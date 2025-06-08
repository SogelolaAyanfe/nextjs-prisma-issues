import { auth } from 'auth'
import { AppShell } from 'components/app-shell'
import { SearchContainer } from 'containers/search'
import { redirect } from 'next/navigation'

const SearchPage = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <AppShell>
            <SearchContainer />
        </AppShell>
    )
}

export default SearchPage
