import { auth } from 'auth'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Field, FieldGroup, Fieldset, Label } from 'components/fieldset'
import { Heading } from 'components/heading'
import { Input } from 'components/input'
import { SignIn } from 'components/SignIn'

const Home = async () => {
    const session = await auth()
    if (!session) return <SignIn />

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
            <Card className="w-100">
                <Heading level={1} className="mb-4">
                    Sign in
                </Heading>

                <Fieldset className="mb-8">
                    <FieldGroup>
                        <Field>
                            <Label>Email</Label>
                            <Input type="text" placeholder="Enter your email" size="lg" />
                        </Field>
                        <Field>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                size="lg"
                            />
                        </Field>
                    </FieldGroup>
                </Fieldset>
                <Button size="lg" color="indigo">
                    Sign in
                </Button>
            </Card>
        </main>
    )
}

export default Home
