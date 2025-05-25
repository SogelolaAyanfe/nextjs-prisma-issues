import { auth } from 'auth'
import { Reviews } from 'blocks/review/reviews'
import { redirect } from 'next/navigation'

const Page = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div className="flex flex-col gap-12">
            <Reviews showTitle={false} />
        </div>
    )
}

export default Page
