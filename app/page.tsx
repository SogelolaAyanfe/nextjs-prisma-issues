import { auth, signIn } from 'auth'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Field, FieldGroup, Fieldset, Label } from 'components/fieldset'
import { Heading } from 'components/heading'
import { Input } from 'components/input'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
            
        </main>
    )
}

export default Home
