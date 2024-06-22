import { faker } from '@faker-js/faker'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  return {
    employee: {
      id: id ? id : faker.number.int({ min: 10000, max: 20000 }),
      name: faker.person.fullName(),
      bio: faker.person.bio(),
      profilePicture: faker.image.urlLoremFlickr({ width: 640, height: 480 }),
      jobArea: faker.person.jobArea(),
      jobTitle: faker.person.jobTitle(),
      jobType: faker.person.jobType(),
      isActive: faker.datatype.boolean(),
    }
  }
})
