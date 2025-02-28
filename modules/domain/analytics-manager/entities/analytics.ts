export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom'

export type SalesAnalytics = {
    totalSales: number
    orderCount: number
    averageOrderValue: number
    salesByDay: Record<string, number>
    salesByCategory: Record<string, number>
    salesByVendor: Record<string, number>
    topSellingProducts: Array<{
        productId: string
        name: string
        quantity: number
        revenue: number
    }>
}

export type UserAnalytics = {
    totalUsers: number
    newUsers: number
    activeUsers: number
    usersByCountry: Record<string, number>
    usersByDevice: Record<string, number>
    conversionRate: number
    churnRate: number
}

export type VendorAnalytics = {
    totalVendors: number
    activeVendors: number
    vendorsByPerformance: Array<{
        vendorId: string
        name: string
        sales: number
        orderCount: number
        averageRating: number
    }>
    topPerformingCategories: Record<string, number>
}

export type InventoryAnalytics = {
    totalProducts: number
    lowStockProducts: Array<{
        productId: string
        name: string
        currentStock: number
        reorderLevel: number
    }>
    outOfStockProducts: number
    inventoryValue: number
    inventoryTurnoverRate: number
}

export type SearchAnalytics = {
    topSearchTerms: Array<{
        term: string
        count: number
        conversionRate: number
    }>
    searchesWithNoResults: Array<{
        term: string
        count: number
    }>
    averageSearchResultsCount: number
}
