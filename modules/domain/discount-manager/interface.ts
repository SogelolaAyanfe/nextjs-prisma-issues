import { Effect, Context } from 'effect'
import {
    Coupon,
    Promotion,
    DiscountType,
    DiscountTarget,
} from 'modules/domain/discount-manager/entities'
import { DiscountManagerError } from 'modules/domain/discount-manager/error'

export type DiscountManager = {
    // Coupons
    createCoupon: (
        coupon: Omit<Coupon, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<Coupon, DiscountManagerError>
    fetchCoupons: () => Effect.Effect<Coupon[], DiscountManagerError>
    fetchCouponById: (id: string) => Effect.Effect<Coupon, DiscountManagerError>
    fetchCouponByCode: (code: string) => Effect.Effect<Coupon, DiscountManagerError>
    updateCoupon: (
        id: string,
        coupon: Partial<Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>>,
    ) => Effect.Effect<Coupon, DiscountManagerError>
    deleteCoupon: (id: string) => Effect.Effect<void, DiscountManagerError>
    validateCoupon: (
        code: string,
        userId: string,
        cartTotal: number,
        items: Array<{
            productId: string
            categoryId: string
            vendorId: string
            quantity: number
            price: number
        }>,
    ) => Effect.Effect<Coupon, DiscountManagerError>
    applyCoupon: (
        couponId: string,
        userId: string,
    ) => Effect.Effect<void, DiscountManagerError>

    // Promotions
    createPromotion: (
        promotion: Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<Promotion, DiscountManagerError>
    fetchPromotions: () => Effect.Effect<Promotion[], DiscountManagerError>
    fetchPromotionById: (id: string) => Effect.Effect<Promotion, DiscountManagerError>
    fetchActivePromotions: () => Effect.Effect<Promotion[], DiscountManagerError>
    updatePromotion: (
        id: string,
        promotion: Partial<Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>>,
    ) => Effect.Effect<Promotion, DiscountManagerError>
    deletePromotion: (id: string) => Effect.Effect<void, DiscountManagerError>

    // Discount calculations
    calculateDiscount: (
        items: Array<{
            productId: string
            categoryId: string
            vendorId: string
            quantity: number
            price: number
        }>,
        promotionIds: string[],
        couponId?: string,
    ) => Effect.Effect<
        { discountAmount: number; breakdown: Record<string, number> },
        DiscountManagerError
    >
}

export const DiscountManager = Context.GenericTag<DiscountManager>('discount-manager')
