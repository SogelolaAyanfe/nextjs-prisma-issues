import { cn } from 'lib/utils'
import { ReactNode } from 'react'

interface SkeletonProps {
    isLoading: boolean
    children: ReactNode
    className?: string
    skeletonClassName?: string
}

export const Skeleton = ({
    isLoading,
    children,
    className,
    skeletonClassName,
}: SkeletonProps) => {
    if (isLoading) {
        return (
            <div
                className={cn(
                    'animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800',
                    skeletonClassName,
                )}
            >
                <div className={cn('invisible', className)}>{children}</div>
            </div>
        )
    }

    return <div className={className}>{children}</div>
}
