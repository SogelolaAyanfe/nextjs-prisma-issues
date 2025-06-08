import { AppShell } from 'components/app-shell'
import { ProductPage } from 'containers/products'

export const Page = async ({ params }: { params: { id: string } }) => {
    return (
        <AppShell>
            <ProductPage params={params} />
        </AppShell>
    )
}
export default Page
