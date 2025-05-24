'use client'

import { Button } from 'components/button'
import { useState } from 'react'

export const FollowButton = ({
    isFollowing: initialIsFollowing,
}: {
    isFollowing: boolean
}) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    return (
        <Button
            className="ml-2 text-white"
            color={isFollowing ? 'dark/zinc' : 'blue'}
            onClick={() => setIsFollowing(!isFollowing)}
        >
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    )
}
