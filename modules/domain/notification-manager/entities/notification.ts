export type NotificationType = 'email' | 'sms' | 'push' | 'in_app'

export type NotificationTemplate = {
    id: string
    name: string
    type: NotificationType
    subject?: string
    content: string
    variables: string[]
    isActive: boolean
}

export type Notification = {
    id: string
    userId: string
    type: NotificationType
    title: string
    content: string
    isRead: boolean
    data?: Record<string, unknown>
    createdAt: Date
}

export type NotificationPreference = {
    id: string
    userId: string
    orderUpdates: boolean
    promotions: boolean
    accountUpdates: boolean
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    inAppEnabled: boolean
}
