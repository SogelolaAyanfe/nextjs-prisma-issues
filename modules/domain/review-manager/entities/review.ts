export type ProductReview = {
    id: string
    productId: string
    userId: string
    rating: number
    title: string
    content: string
    images?: string[]
    isVerifiedPurchase: boolean
    status: 'pending' | 'approved' | 'rejected'
    helpfulCount: number
    createdAt: Date
    updatedAt: Date
}

export type VendorReview = {
    id: string
    vendorId: string
    userId: string
    rating: number
    title: string
    content: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: Date
    updatedAt: Date
}

export type ReviewResponse = {
    id: string
    reviewId: string
    responderId: string
    responderType: 'vendor' | 'admin'
    content: string
    createdAt: Date
    updatedAt: Date
}
