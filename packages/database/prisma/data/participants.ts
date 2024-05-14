import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedParticipants = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const users = await prisma.users.findMany();
  const chats = await prisma.chats.findMany();

  // Добавление админа во все чаты
  for (let i = 0; i < chats.length; i++) {
    await prisma.participants.createMany({
      data: [
        {
          userId: users[0].id,
          chatId: chats[i].id,
        },
      ],
    });
  }

  // Добавление разных пользователей в разные чаты с админом
  for (let i = 0; i < chats.length; i++) {
    await prisma.participants.createMany({
      data: [
        {
          userId: users[i + 1].id,
          chatId: chats[i].id,
        },
      ],
    });
  }
};
