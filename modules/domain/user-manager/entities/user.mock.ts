import { faker } from '@faker-js/faker'
import { User } from 'modules/domain/user-manager/entities/user'

export const userMock: User = {
    id: faker.string.uuid(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    emailVerified: new Date(),
    image: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    updatedAt: new Date(),
}
