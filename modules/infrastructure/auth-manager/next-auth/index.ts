import { providers } from 'modules/infrastructure/auth-manager/next-auth/providers'
import { NextAuthConfig } from 'next-auth'

export const authOptions: NextAuthConfig = {
    providers,
    pages: {
        signIn: '/',
        verifyRequest: '/',
        signOut: '/',
        error: '/',
    },
}
