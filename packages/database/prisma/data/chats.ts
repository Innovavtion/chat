import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedChats = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  for (let i = 0; i < 10; i++) {
    await prisma.chats.create({
      data: {
        dataCreate: faker.date.between({
          from: "2024-05-14T10:00:00.000Z",
          to: "2024-05-14T10:00:00.000Z",
        }),
      },
    });
  }
};
