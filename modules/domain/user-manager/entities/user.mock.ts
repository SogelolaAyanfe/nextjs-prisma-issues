import { faker } from '@faker-js/faker'
import { User } from 'modules/domain/user-manager/entities/user'

export const userMock: User = {
    id: faker.string.uuid(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    emailVerified: new Date(),
    image: 'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/001-nike-logos-swoosh-black.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ%3D%3D&s=944ed08387517888c023076bda667c17164b78d613afc64c217a99a51ee1ab29',
    createdAt: new Date(),
    updatedAt: new Date(),
}
