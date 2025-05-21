import { auth } from 'auth'
import { ProductsSearch } from 'blocks/product/products-search'
import { redirect } from 'next/navigation'

const Products = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return <ProductsSearch />
}

export default Products
