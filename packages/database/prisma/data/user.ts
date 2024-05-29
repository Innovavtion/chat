import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt";

export const seedUser = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  await prisma.user.create({
    data: {
      login: "admin",
      email: "admin@mail.ru",
      password: hashSync("admin", genSaltSync(10)),
      lastName: "Admin",
      firstName: "Admin",
      roles: ["ADMIN"],
    },
  });

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        login: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashSync("user", genSaltSync(10)),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
      },
    });
  }
};
