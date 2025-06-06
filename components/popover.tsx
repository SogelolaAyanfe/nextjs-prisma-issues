import * as Headless from '@headlessui/react'
import clsx from 'clsx'

export function Popover(props: Headless.PopoverProps) {
    return <Headless.Popover {...props} />
}

export function PopoverButton(props: Headless.PopoverButtonProps) {
    return <Headless.PopoverButton as="div" {...props} />
}

export function PopoverPanel({ className, ...props }: Headless.PopoverPanelProps) {
    return (
        <Headless.PopoverPanel
            {...props}
            className={clsx(
                className,
                // Base styles
                'isolate w-max rounded-xl p-1',
                // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
                'outline outline-transparent focus:outline-hidden',
                // Handle scrolling when menu won't fit in viewport
                'overflow-y-auto',
                // Popover background
                'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
                // Shadows
                'shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset',
                // Transitions
                'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
            )}
        />
    )
}
