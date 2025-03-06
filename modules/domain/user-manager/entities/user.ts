import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().email(),
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type User = z.infer<typeof UserSchema>

export const AccountSchema = z.object({
    userId: z.string(),
    type: z.string(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().nullable(),
    access_token: z.string().nullable(),
    expires_at: z.number().int().nullable(),
    token_type: z.string().nullable(),
    scope: z.string().nullable(),
    id_token: z.string().nullable(),
    session_state: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Account = z.infer<typeof AccountSchema>

export const SessionSchema = z.object({
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

// You can also create schemas with relationships if needed
export const UserWithRelationsSchema = UserSchema.extend({
    accounts: z.array(AccountSchema).optional(),
    sessions: z.array(SessionSchema).optional(),
})

export type UserWithRelations = z.infer<typeof UserWithRelationsSchema>
