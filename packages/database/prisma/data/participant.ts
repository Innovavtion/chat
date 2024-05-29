import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const seedParticipant = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const users = await prisma.user.findMany();
  const chats = await prisma.chat.findMany();

  // Добавление админа во все чаты
  for (let i = 0; i < chats.length; i++) {
    await prisma.participant.createMany({
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
    await prisma.participant.createMany({
      data: [
        {
          userId: users[i + 1].id,
          chatId: chats[i].id,
        },
      ],
    });
  }
};
