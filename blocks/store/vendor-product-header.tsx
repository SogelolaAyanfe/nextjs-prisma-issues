'use client'

import { Avatar } from 'components/avatar'
import { userMock } from 'modules/domain/user-manager/entities/user.mock'
import Link from 'next/link'
import { routes } from 'routes'

export const VendorProductHeader = () => {
    return (
        <Link
            className="flex cursor-pointer space-x-2"
            href={routes.store.home({ id: 'some id' })}
        >
            <Avatar src={userMock.image} className="size-9" />
            <div className="flex flex-col">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {userMock.name}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                    Ibadan, Nigeria
                </p>
            </div>
        </Link>
    )
}
