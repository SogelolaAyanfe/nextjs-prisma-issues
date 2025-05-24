import { addQueryParams } from 'lib/url'
export const routes = {
    home: () => '/',
    store: {
        dashboard: () => '/store/dashboard',
        home: ({ id }: { id: string }) => `/store/${id}`,
        products: ({
            vendorId,
            params,
        }: {
            vendorId: string
            params?: {
                sort: 'newest' | 'price-asc' | 'price-desc'
            }
        }) => addQueryParams(`/store/${vendorId}/products`, params),
    },
    product: ({ id }: { id: string }) => `/products/${id}`,
}
