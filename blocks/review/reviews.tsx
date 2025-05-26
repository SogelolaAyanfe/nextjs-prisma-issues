'use client'

import { Avatar } from 'components/avatar'
import { Heading } from 'components/heading'
import { Pagination } from 'components/pagination'
import { StarRating } from 'components/star-rating'
import { Text } from 'components/text'
import { initials } from 'modules/domain/user-manager/entities/user'
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const reviews = [
    {
        id: 1,
        rating: 5,
        recommends: true,
        text: 'Great quality and fast shipping!',
        name: 'Kamilija Teklè Čižaitė',
        date: 'May 23, 2025',
        avatar: null,
        initials: 'K',
    },
    {
        id: 2,
        rating: 2,
        recommends: true,
        text: "It's the perfect gift for book lovers and any one who needs a bookmark while reading.",
        name: 'Elijah',
        date: 'May 21, 2025',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        initials: 'E',
    },
    {
        id: 3,
        rating: 5,
        recommends: true,
        text: 'Unique and high quality bookmark. Thank you so much',
        name: 'Mya B',
        date: 'May 21, 2025',
        avatar: null,
        initials: 'M',
    },
    {
        id: 4,
        rating: 2,
        recommends: true,
        text: 'Bad product and terrible packaging.',
        name: 'Shams Jamal',
        date: 'May 13, 2025',
        avatar: null,
        initials: 'S',
    },
    {
        id: 5,
        rating: 2,
        recommends: true,
        text: 'Bad product and terrible packaging.',
        name: 'Shams Jamal',
        date: 'May 13, 2025',
        avatar: null,
    },
    {
        id: 6,
        rating: 2,
        recommends: true,
        text: 'Bad product and terrible packaging.',
        name: 'Shams Jamal',
        date: 'May 13, 2025',
        avatar: null,
    },
]

export const Reviews = ({ showTitle = true }: { showTitle?: boolean }) => {
    const [page, setPage] = useState(1)

    return (
        <div className="flex flex-col gap-8">
            {showTitle && (
                <Heading className="mb-2 !text-2xl" level={2}>
                    Reviews
                </Heading>
            )}
            {reviews.map(review => (
                <div
                    key={review.id}
                    className="flex flex-col gap-2 border-b border-zinc-200 pb-6 last:border-b-0 dark:border-zinc-800"
                >
                    <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        {review.recommends && (
                            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                                <FaCheckCircle className="inline-block" size={16} />{' '}
                                Recommends
                            </span>
                        )}
                    </div>
                    <Text className="text-lg">{review.text}</Text>
                    <div className="mt-2 flex items-center gap-2">
                        <Avatar
                            src={review.avatar}
                            initials={initials(review)}
                            alt={review.name}
                            className="size-7"
                        />
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                            {review.name}
                        </span>
                        <span className="text-sm text-zinc-500">{review.date}</span>
                    </div>
                </div>
            ))}
            <div className="flex justify-center">
                <Pagination
                    page={page}
                    pageSize={1}
                    total={reviews.length}
                    onChange={setPage}
                />
            </div>
        </div>
    )
}
