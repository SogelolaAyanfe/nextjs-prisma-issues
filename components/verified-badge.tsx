import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { Text } from 'components/text'

export const VerifiedBadge = () => {
    return (
        <div className="flex items-center gap-1">
            <CheckBadgeIcon className="size-6 fill-blue-400" />
            <Text className="!text-xs !text-blue-400">Verified store</Text>
        </div>
    )
}
