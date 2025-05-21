import { faker } from '@faker-js/faker'
import { Vendor, VendorStatus } from 'modules/domain/vendor-manager/entities/vendor'

export const vendorMock: Vendor = {
    id: 'random-id',
    name: 'Nike Store',
    description:
        'Nike store is the brand of online store that provides you with quality and affordable jewelries and sunglasses for both male and female.',
    logo: 'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/001-nike-logos-swoosh-black.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjo1MDAwLCJoZWlnaHQiOjI4MTN9LCJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ%3D%3D&s=944ed08387517888c023076bda667c17164b78d613afc64c217a99a51ee1ab29',
    status: VendorStatus.APPROVED,
    email: 'vendor1@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    banner: 'https://images.pexels.com/photos/12725055/pexels-photo-12725055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: 'Ibadan, Nigeria',
    category: 'Apparel & Clothing',
}
