'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'

export const Disclosure = ({ children }: { children: React.ReactNode }) => {
    return <Headless.Disclosure>{children}</Headless.Disclosure>
}

export const DisclosureButton = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <Headless.DisclosureButton className={clsx(className)}>
            {children}
        </Headless.DisclosureButton>
    )
}

export const DisclosurePanel = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <Headless.DisclosurePanel
            transition
            className={clsx(
                className,
                'origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0',
            )}
        >
            {children}
        </Headless.DisclosurePanel>
    )
}
