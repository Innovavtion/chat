import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedFriend = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const users = await prisma.user.findMany();

  // Уже в друзьях у админа
  for (let i = 0; i < 20; i++) {
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
  for (let i = 20; i < 25; i++) {
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

  // Админа пригласили в друзья
  for (let i = 25; i < 50; i++) {
    await prisma.friend.createMany({
      data: [
        {
          userInviteId: users[i + 1].id,
          userReceivingId: users[0].id,
          statusInvite: false,
        },
      ],
    });
  }
};
