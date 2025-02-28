import { Effect, Context } from 'effect'
import {
    ProductReview,
    VendorReview,
    ReviewResponse,
} from 'modules/domain/review-manager/entities'
import { ReviewManagerError } from 'modules/domain/review-manager/error'

export type ReviewManager = {
    // Product reviews
    createProductReview: (
        review: Omit<
            ProductReview,
            'id' | 'status' | 'helpfulCount' | 'createdAt' | 'updatedAt'
        >,
    ) => Effect.Effect<ProductReview, ReviewManagerError>
    fetchProductReviews: (
        productId: string,
    ) => Effect.Effect<ProductReview[], ReviewManagerError>
    fetchUserProductReviews: (
        userId: string,
    ) => Effect.Effect<ProductReview[], ReviewManagerError>
    updateProductReview: (
        id: string,
        review: Partial<
            Omit<ProductReview, 'id' | 'productId' | 'userId' | 'createdAt' | 'updatedAt'>
        >,
    ) => Effect.Effect<ProductReview, ReviewManagerError>
    deleteProductReview: (id: string) => Effect.Effect<void, ReviewManagerError>
    moderateProductReview: (
        id: string,
        status: ProductReview['status'],
    ) => Effect.Effect<ProductReview, ReviewManagerError>
    markReviewHelpful: (id: string) => Effect.Effect<ProductReview, ReviewManagerError>

    // Vendor reviews
    createVendorReview: (
        review: Omit<VendorReview, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<VendorReview, ReviewManagerError>
    fetchVendorReviews: (
        vendorId: string,
    ) => Effect.Effect<VendorReview[], ReviewManagerError>
    fetchUserVendorReviews: (
        userId: string,
    ) => Effect.Effect<VendorReview[], ReviewManagerError>
    updateVendorReview: (
        id: string,
        review: Partial<
            Omit<VendorReview, 'id' | 'vendorId' | 'userId' | 'createdAt' | 'updatedAt'>
        >,
    ) => Effect.Effect<VendorReview, ReviewManagerError>
    deleteVendorReview: (id: string) => Effect.Effect<void, ReviewManagerError>
    moderateVendorReview: (
        id: string,
        status: VendorReview['status'],
    ) => Effect.Effect<VendorReview, ReviewManagerError>

    // Review responses
    createReviewResponse: (
        response: Omit<ReviewResponse, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<ReviewResponse, ReviewManagerError>
    fetchReviewResponses: (
        reviewId: string,
    ) => Effect.Effect<ReviewResponse[], ReviewManagerError>
    updateReviewResponse: (
        id: string,
        content: string,
    ) => Effect.Effect<ReviewResponse, ReviewManagerError>
    deleteReviewResponse: (id: string) => Effect.Effect<void, ReviewManagerError>

    // Analytics
    getProductRatingAverage: (
        productId: string,
    ) => Effect.Effect<number, ReviewManagerError>
    getVendorRatingAverage: (
        vendorId: string,
    ) => Effect.Effect<number, ReviewManagerError>
    getProductRatingDistribution: (
        productId: string,
    ) => Effect.Effect<Record<number, number>, ReviewManagerError>
}

export const ReviewManager = Context.GenericTag<ReviewManager>('review-manager')
