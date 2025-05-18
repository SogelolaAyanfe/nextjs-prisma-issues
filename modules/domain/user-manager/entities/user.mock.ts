import { faker } from '@faker-js/faker'
import { User } from 'modules/domain/user-manager/entities/user'

export const userMock: User = {
    id: faker.string.uuid(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    emailVerified: new Date(),
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: new Date(),
    updatedAt: new Date(),
}
