import { trpc } from 'modules/infrastructure/api/trpc/client'

const Page = async () => {
    const users = trpc.users.list.useQuery()

    return (
        <div>
            <h1>Users</h1>
            <ul>{users.data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>
        </div>
    )
}

export default Page
