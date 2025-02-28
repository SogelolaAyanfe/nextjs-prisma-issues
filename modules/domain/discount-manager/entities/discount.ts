export type DiscountType = 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping'

export type DiscountTarget = 'product' | 'category' | 'vendor' | 'cart' | 'shipping'

export type DiscountCondition = {
    type:
        | 'minimum_spend'
        | 'minimum_items'
        | 'specific_products'
        | 'specific_categories'
        | 'first_order'
        | 'user_group'
    value: string | number | string[]
}

export type Coupon = {
    id: string
    code: string
    discountType: DiscountType
    discountValue: number
    target: DiscountTarget
    targetIds?: string[]
    conditions?: DiscountCondition[]
    usageLimit?: number
    usageCount: number
    perUserLimit?: number
    startDate: Date
    endDate?: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export type Promotion = {
    id: string
    name: string
    description: string
    discountType: DiscountType
    discountValue: number
    target: DiscountTarget
    targetIds?: string[]
    conditions?: DiscountCondition[]
    startDate: Date
    endDate?: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}
