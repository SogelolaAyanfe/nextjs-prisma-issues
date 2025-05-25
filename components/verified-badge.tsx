import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { Text } from 'components/text'

export const VerifiedBadge = ({ showText = true }: { showText?: boolean }) => {
    return (
        <div className={'flex items-center gap-1'}>
            <CheckBadgeIcon className="size-6 fill-blue-400" />
            {showText && <Text className="!text-xs !text-blue-400">Verified store</Text>}
        </div>
    )
}
