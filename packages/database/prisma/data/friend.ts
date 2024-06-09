import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedFriend = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const users = await prisma.user.findMany();

  // Уже в друзьях у админа
  for (let i = 0; i < 5; i++) {
    await prisma.friend.createMany({
      data: [
        {
          userInviteId: users[0].id,
          userReceivingId: users[i + 1].id,
          statusInvite: true,
        },
      ],
    });
  }

  // Админ отправил запрос в друзья
  for (let i = 5; i < 10; i++) {
    await prisma.friend.createMany({
      data: [
        {
          userInviteId: users[0].id,
          userReceivingId: users[i + 1].id,
          statusInvite: false,
        },
      ],
    });
  }
};
