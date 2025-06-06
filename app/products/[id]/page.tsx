import { ProductPage } from 'app/containers/products'
import { AppShell } from 'components/app-shell'

export const Page = async ({ params }: { params: { id: string } }) => {
    return (
        <AppShell>
            <ProductPage params={params} />
        </AppShell>
    )
}
export default Page
