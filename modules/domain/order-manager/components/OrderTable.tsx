import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Button } from 'components/button'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from 'components/dropdown'
import { Subheading } from 'components/heading'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'components/table'
import { Order } from 'modules/domain/order-manager/entities/order'
import Link from 'next/link'

export const OrderTable = ({
    orders,
}: {
    orders: Pick<Order, 'id' | 'userId' | 'status' | 'total'>[]
}) => {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between text-xl">
                <Subheading>Orders</Subheading>
                <Button size="sm">See all orders</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Order number</TableHeader>
                        <TableHeader>Customer</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <TableHeader> </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">
                                <Link href={`/orders/${order.id}`}>{order.id}</Link>
                            </TableCell>
                            <TableCell>{order.userId}</TableCell>
                            <TableCell className="text-zinc-500">
                                {order.status}
                            </TableCell>
                            <TableCell className="text-zinc-500">{order.total}</TableCell>
                            <TableCell>
                                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                    <Dropdown>
                                        <DropdownButton plain aria-label="More options">
                                            <EllipsisHorizontalIcon />
                                        </DropdownButton>
                                        <DropdownMenu anchor="bottom end">
                                            <DropdownItem>View</DropdownItem>
                                            <DropdownItem>Edit</DropdownItem>
                                            <DropdownItem>Delete</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
