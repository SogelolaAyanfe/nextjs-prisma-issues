import { Avatar } from 'components/avatar'
import { StarRating } from 'components/star-rating'
import { Text } from 'components/text'
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
    rating: 5,
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
    rating: 5,
    recommends: true,
    text: 'Good product and nice packaging',
    name: 'Shams Jamal',
    date: 'May 13, 2025',
    avatar: null,
    initials: 'S',
  },
]

export function ReviewsSection() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-2 border-b border-zinc-200 pb-6 last:border-b-0 dark:border-zinc-800"
        >
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="font-bold text-lg">{review.rating}</span>
            {review.recommends && (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <FaCheckCircle className="inline-block" size={16} /> Recommends
              </span>
            )}
          </div>
          <Text className="text-lg">{review.text}</Text>
          <div className="flex items-center gap-2 mt-2">
            <Avatar
              src={review.avatar}
              initials={review.initials}
              alt={review.name}
              className="size-7"
            />
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{review.name}</span>
            <span className="text-zinc-500 text-sm">{review.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewsSection 
