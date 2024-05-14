import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedUsers = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  await prisma.users.create({
    data: {
      login: "admin",
      email: "admin@mail.ru",
      password: "admin",
      lastName: "Admin",
      firstName: "Admin",
    },
  });

  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        login: faker.person.lastName(),
        email: faker.internet.email(),
        password: "user",
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
      },
    });
  }
};
