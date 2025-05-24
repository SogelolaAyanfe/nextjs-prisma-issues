import { ProductPage } from 'app/containers/products'

export const Page = async ({ params }: { params: { id: string } }) => {
    return <ProductPage params={params} />
}
export default Page
