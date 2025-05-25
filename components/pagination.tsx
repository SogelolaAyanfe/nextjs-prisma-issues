import clsx from 'clsx'
import { Button } from 'components/button'
import type React from 'react'

export function PaginationContainer({
    'aria-label': ariaLabel = 'Page navigation',
    className,
    ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
    return (
        <nav
            aria-label={ariaLabel}
            {...props}
            className={clsx(className, 'flex gap-x-2')}
        />
    )
}

export function PaginationPrevious({
    href = null,
    className,
    children = 'Previous',
    onClick,
}: React.PropsWithChildren<{
    href?: string | null
    className?: string
    onClick?: () => void
}>) {
    return (
        <span className={clsx(className, 'grow basis-0')}>
            <Button
                {...(href === null ? {} : { href })}
                plain
                aria-label="Previous page"
                onClick={onClick}
            >
                <svg
                    className="stroke-current"
                    data-slot="icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {children}
            </Button>
        </span>
    )
}

export function PaginationNext({
    href = null,
    className,
    children = 'Next',
    onClick,
}: React.PropsWithChildren<{
    href?: string | null
    className?: string
    onClick?: () => void
}>) {
    return (
        <span className={clsx(className, 'flex grow basis-0 justify-end')}>
            <Button
                {...(href === null ? {} : { href })}
                plain
                aria-label="Next page"
                onClick={onClick}
            >
                {children}
                <svg
                    className="stroke-current"
                    data-slot="icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Button>
        </span>
    )
}

export function PaginationList({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'span'>) {
    return (
        <span
            {...props}
            className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')}
        />
    )
}

export function PaginationPage({
    href,
    className,
    current = false,
    children,
    onClick,
}: React.PropsWithChildren<{
    href?: string | null
    className?: string
    current?: boolean
    onClick?: () => void
}>) {
    return (
        <Button
            {...(href ? { href } : {})}
            plain
            aria-label={`Page ${children}`}
            aria-current={current ? 'page' : undefined}
            className={clsx(
                className,
                'min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg',
                current && 'before:bg-zinc-950/5 dark:before:bg-white/10',
            )}
            onClick={onClick}
        >
            <span className="-mx-0.5">{children}</span>
        </Button>
    )
}

export function PaginationGap({
    className,
    children = <>&hellip;</>,
    ...props
}: React.ComponentPropsWithoutRef<'span'>) {
    return (
        <span
            aria-hidden="true"
            {...props}
            className={clsx(
                className,
                'w-[2.25rem] text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white',
            )}
        >
            {children}
        </span>
    )
}

export const Pagination = ({
    page,
    pageSize,
    total,
    onChange,
}: {
    page: number
    pageSize: number
    total: number
    onChange: (page: number) => void
}) => {
    const totalPages = Math.ceil(total / pageSize)
    if (totalPages <= 1) return null

    // Helper to generate page numbers with gaps
    const getPages = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, 'gap', totalPages)
            } else if (page >= totalPages - 2) {
                pages.push(
                    1,
                    'gap',
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                )
            } else {
                pages.push(1, 'gap', page - 1, page, page + 1, 'gap', totalPages)
            }
        }
        return pages
    }

    const pages = getPages()

    return (
        <PaginationContainer>
            <PaginationPrevious
                onClick={() => page > 1 && onChange(page - 1)}
                aria-disabled={page === 1}
            >
                Previous
            </PaginationPrevious>
            <PaginationList>
                {pages.map((p, idx) =>
                    p === 'gap' ? (
                        <PaginationGap key={`gap-${idx}`} />
                    ) : (
                        <PaginationPage
                            key={p}
                            onClick={() => p !== page && onChange(Number(p))}
                            current={p === page}
                            aria-disabled={p === page}
                        >
                            {p}
                        </PaginationPage>
                    ),
                )}
            </PaginationList>
            <PaginationNext
                onClick={() => page < totalPages && onChange(page + 1)}
                aria-disabled={page === totalPages}
            >
                Next
            </PaginationNext>
        </PaginationContainer>
    )
}
