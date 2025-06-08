import { AppShell } from 'components/app-shell'
import { OrdersPage } from 'containers/orders'

export default function Page() {
    return (
        <AppShell>
            <OrdersPage />
        </AppShell>
    )
}
