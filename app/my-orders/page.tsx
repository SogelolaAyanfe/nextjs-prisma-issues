import { AppShell } from 'components/app-shell'
import { MyOrdersPage } from 'containers/my-orders'

export default function Page() {
    return (
        <AppShell>
            <MyOrdersPage />
        </AppShell>
    )
}
