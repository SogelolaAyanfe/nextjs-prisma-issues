import { auth } from 'auth'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Field, FieldGroup, Fieldset, Label } from 'components/fieldset'
import { Heading } from 'components/heading'
import { Input } from 'components/input'
import { SignIn } from 'components/SignIn'
import { redirect } from 'next/navigation'

const Home = async () => {
    const session = await auth()
    if (!session) return <SignIn />

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
            <Card className="w-100">
                <Heading level={1} className="mb-4">
                    Sign in
                </Heading>

                <form
                    action={async formData => {
                        'use server'
                        const { email } = Object.fromEntries(formData)
                        // route to different page
                        redirect('/dashboard')
                        // const user = await signIn(email, password)
                    }}
                    className="flex flex-col"
                >
                    <Fieldset className="mb-5">
                        <FieldGroup>
                            <Field>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your email"
                                    size="lg"
                                    name="email"
                                />
                            </Field>
                        </FieldGroup>
                    </Fieldset>
                    <Button size="lg" color="indigo" type="submit">
                        Sign in
                    </Button>
                </form>
            </Card>
        </main>
    )
}

export default Home
