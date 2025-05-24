import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

interface StarRatingProps {
    rating: number
    className?: string
}

const starClassName = 'text-zinc-500 dark:text-white'

export const StarRating = ({ rating, className = '' }: StarRatingProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 ${className}`}>
                {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1
                    if (rating >= starValue) {
                        return (
                                <FaStar key={i} className={starClassName} size={25} />
                        )
                    } else if (rating >= starValue - 0.5) {
                        return (
                            <FaStarHalfAlt key={i} className={starClassName} size={25} />
                        )
                    } else {
                        return (
                            <FaRegStar key={i} className={starClassName} size={25} />
                        )
                    }
                })}
            </span>
            <span className="text-lg font-semibold">{rating}</span>
        </div>
    )
}
