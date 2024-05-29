import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedMessage = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const users = await prisma.user.findMany();
  const chats = await prisma.chat.findMany();

  // Написание текста админом
  for (let i = 0; i < chats.length; i++) {
    await prisma.message.createMany({
      data: [
        {
          userId: users[0].id,
          chatId: chats[i].id,
          text: faker.lorem.text(),
          dataWrite: faker.date.between({
            from: "2024-05-14T10:00:00.000Z",
            to: "2024-05-14T10:00:00.000Z",
          }),
        },
      ],
    });
  }

  for (let i = 0; i < chats.length; i++) {
    await prisma.message.createMany({
      data: [
        {
          userId: users[i + 1].id,
          chatId: chats[i].id,
          text: faker.lorem.text(),
          dataWrite: faker.date.between({
            from: "2024-05-14T10:00:00.000Z",
            to: "2024-05-14T24:00:00.000Z",
          }),
        },
      ],
    });
  }
};
