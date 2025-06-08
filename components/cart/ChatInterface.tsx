'use client'

import { Badge } from 'components/badge'
import { Button } from 'components/button'
import type { ChatMessage, Store } from 'components/cart/types'
import { Text } from 'components/text'
import { format } from 'lib/money'
import { useEffect, useRef, useState } from 'react'

interface ChatInterfaceProps {
    store: Store
    messages: ChatMessage[]
    onSendMessage: (message: string) => void
    onConfirmPayment: () => void
    onCopyDetails: () => void
}

export const ChatInterface = ({
    store,
    messages,
    onSendMessage,
    onConfirmPayment,
    onCopyDetails,
}: ChatInterfaceProps) => {
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50 p-5 dark:bg-zinc-900">
                {messages.map(message => (
                    <div key={message.id} className="animate-fade-in">
                        {message.type === 'system' && (
                            <div className="text-center">
                                <Badge color="blue" className="mx-auto">
                                    {message.content}
                                </Badge>
                            </div>
                        )}

                        {message.type === 'vendor' && (
                            <div className="flex justify-start">
                                <div className="max-w-[85%] rounded-2xl bg-white p-4 shadow-md dark:bg-zinc-800">
                                    <Text className="whitespace-pre-wrap">
                                        {message.content}
                                    </Text>

                                    {message.orderSummary && (
                                        <div className="mt-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
                                            <div className="mb-2 flex items-center gap-2">
                                                <Text className="font-semibold">
                                                    📦 Your Order
                                                </Text>
                                            </div>
                                            {message.orderSummary.items.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between py-2"
                                                >
                                                    <div>
                                                        <Text className="font-medium">
                                                            {item.name}
                                                        </Text>
                                                        {item.variant && (
                                                            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                {item.variant}
                                                            </Text>
                                                        )}
                                                    </div>
                                                    <Badge
                                                        color={
                                                            message.orderSummary
                                                                ?.status === 'approved'
                                                                ? 'green'
                                                                : message.orderSummary
                                                                        ?.status ===
                                                                    'pending'
                                                                  ? 'yellow'
                                                                  : 'red'
                                                        }
                                                    >
                                                        {message.orderSummary?.status ===
                                                        'approved'
                                                            ? '✓ Available'
                                                            : message.orderSummary
                                                                    ?.status === 'pending'
                                                              ? '⏳ Pending'
                                                              : '✗ Unavailable'}
                                                    </Badge>
                                                </div>
                                            ))}
                                            <div className="border-t border-zinc-200 pt-2 dark:border-zinc-700">
                                                <div className="flex items-center justify-between font-semibold">
                                                    <Text>Total Amount</Text>
                                                    <Text>
                                                        {format(
                                                            message.orderSummary
                                                                .totalAmount,
                                                        )}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {message.paymentInfo && (
                                        <div className="mt-3 rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                                            <div className="mb-3 flex items-center gap-2">
                                                <Text className="font-semibold text-green-800 dark:text-green-200">
                                                    💳 Bank Transfer Details
                                                </Text>
                                            </div>
                                            <div className="mb-3 rounded bg-white p-3 font-mono text-sm dark:bg-zinc-800">
                                                <div>
                                                    Bank Name:{' '}
                                                    {message.paymentInfo.bankName}
                                                </div>
                                                <div>
                                                    Account Name:{' '}
                                                    {message.paymentInfo.accountName}
                                                </div>
                                                <div>
                                                    Account Number:{' '}
                                                    {message.paymentInfo.accountNumber}
                                                </div>
                                                <div>
                                                    Sort Code:{' '}
                                                    {message.paymentInfo.sortCode}
                                                </div>
                                                <div>
                                                    Amount:{' '}
                                                    {format(
                                                        message.paymentInfo.amount,
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mb-3 rounded bg-yellow-100 p-2 text-sm dark:bg-yellow-900">
                                                <Text className="flex items-center gap-2">
                                                    ⚠️ <strong>Reference:</strong>{' '}
                                                    {message.paymentInfo.reference}
                                                </Text>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    color="green"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={onConfirmPayment}
                                                >
                                                    ✅ Payment Sent
                                                </Button>
                                                <Button
                                                    outline
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={onCopyDetails}
                                                >
                                                    📋 Copy Details
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {message.type === 'user' && (
                            <div className="flex justify-end">
                                <div className="max-w-[85%] rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                                    <Text className="text-white">{message.content}</Text>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}
