export const routes = {
    home: () => '/',
    store: {
        dashboard: () => '/store/dashboard',
        home: ({ id }: { id: string }) => `/store/${id}`,
    },
}
