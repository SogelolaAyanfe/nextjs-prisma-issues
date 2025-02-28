import { Effect, Context } from 'effect'
import {
    Notification,
    NotificationTemplate,
    NotificationPreference,
    NotificationType,
} from 'modules/domain/notification-manager/entities'
import { NotificationManagerError } from 'modules/domain/notification-manager/error'

export type NotificationManager = {
    // Notifications
    sendNotification: (
        userId: string,
        type: NotificationType,
        title: string,
        content: string,
        data?: Record<string, unknown>,
    ) => Effect.Effect<Notification, NotificationManagerError>
    fetchUserNotifications: (
        userId: string,
    ) => Effect.Effect<Notification[], NotificationManagerError>
    markAsRead: (
        notificationId: string,
    ) => Effect.Effect<Notification, NotificationManagerError>
    markAllAsRead: (userId: string) => Effect.Effect<void, NotificationManagerError>
    deleteNotification: (
        notificationId: string,
    ) => Effect.Effect<void, NotificationManagerError>

    // Templates
    createTemplate: (
        template: Omit<NotificationTemplate, 'id'>,
    ) => Effect.Effect<NotificationTemplate, NotificationManagerError>
    updateTemplate: (
        id: string,
        template: Partial<Omit<NotificationTemplate, 'id'>>,
    ) => Effect.Effect<NotificationTemplate, NotificationManagerError>
    fetchTemplates: () => Effect.Effect<NotificationTemplate[], NotificationManagerError>
    fetchTemplateById: (
        id: string,
    ) => Effect.Effect<NotificationTemplate, NotificationManagerError>
    deleteTemplate: (id: string) => Effect.Effect<void, NotificationManagerError>

    // Preferences
    getUserPreferences: (
        userId: string,
    ) => Effect.Effect<NotificationPreference, NotificationManagerError>
    updateUserPreferences: (
        userId: string,
        preferences: Partial<Omit<NotificationPreference, 'id' | 'userId'>>,
    ) => Effect.Effect<NotificationPreference, NotificationManagerError>

    // Sending specific notifications
    sendOrderStatusUpdate: (
        userId: string,
        orderId: string,
        status: string,
    ) => Effect.Effect<void, NotificationManagerError>
    sendPaymentConfirmation: (
        userId: string,
        orderId: string,
        amount: number,
    ) => Effect.Effect<void, NotificationManagerError>
    sendShippingUpdate: (
        userId: string,
        orderId: string,
        trackingNumber: string,
        carrier: string,
    ) => Effect.Effect<void, NotificationManagerError>
}

export const NotificationManager =
    Context.GenericTag<NotificationManager>('notification-manager')
