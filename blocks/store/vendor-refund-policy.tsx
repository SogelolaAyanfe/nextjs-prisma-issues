import { Badge } from 'components/badge'

export const VendorRefundPolicy = () => {
    return (
        <div className="flex items-center gap-2">
            <Badge color="red">No refund</Badge>
            <Badge color="orange">Exchange only</Badge>
        </div>
    )
}
