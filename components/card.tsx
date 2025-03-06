import clsx from 'clsx'
import { forwardRef } from 'react'

const styles = {
    base: ['rounded-xl bg-white p-6 shadow-md dark:bg-zinc-900 flex flex-col gap-2'],
}

type CardProps = { 
    children: React.ReactNode
    className?: string
}

export const Card = forwardRef(
    (
        {  children, className }: CardProps,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div ref={ref} className={clsx(className, styles.base)}>
                
                {children}
            </div>
        )
    },
)
