import { Effect, Context } from 'effect'
import {
    SalesAnalytics,
    UserAnalytics,
    VendorAnalytics,
    InventoryAnalytics,
    SearchAnalytics,
    TimeRange,
} from 'modules/domain/analytics-manager/entities'
import { AnalyticsManagerError } from 'modules/domain/analytics-manager/error'

export type AnalyticsManager = {
    // Sales analytics
    getSalesAnalytics: (
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<SalesAnalytics, AnalyticsManagerError>
    getSalesByVendor: (
        vendorId: string,
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<SalesAnalytics, AnalyticsManagerError>
    getSalesByCategory: (
        categoryId: string,
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<SalesAnalytics, AnalyticsManagerError>

    // User analytics
    getUserAnalytics: (
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<UserAnalytics, AnalyticsManagerError>

    // Vendor analytics
    getVendorAnalytics: (
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<VendorAnalytics, AnalyticsManagerError>
    getVendorPerformance: (
        vendorId: string,
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<VendorAnalytics, AnalyticsManagerError>

    // Inventory analytics
    getInventoryAnalytics: () => Effect.Effect<InventoryAnalytics, AnalyticsManagerError>
    getVendorInventoryAnalytics: (
        vendorId: string,
    ) => Effect.Effect<InventoryAnalytics, AnalyticsManagerError>

    // Search analytics
    getSearchAnalytics: (
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
    ) => Effect.Effect<SearchAnalytics, AnalyticsManagerError>

    // Dashboard
    getDashboardData: (timeRange: TimeRange) => Effect.Effect<
        {
            sales: SalesAnalytics
            users: UserAnalytics
            vendors: VendorAnalytics
            inventory: InventoryAnalytics
        },
        AnalyticsManagerError
    >

    // Export
    exportAnalyticsReport: (
        type: 'sales' | 'users' | 'vendors' | 'inventory' | 'search',
        timeRange: TimeRange,
        startDate?: Date,
        endDate?: Date,
        format?: 'csv' | 'pdf' | 'excel',
    ) => Effect.Effect<string, AnalyticsManagerError>
}

export const AnalyticsManager = Context.GenericTag<AnalyticsManager>('analytics-manager')
