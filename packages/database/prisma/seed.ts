import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
  {
    role: "user",
  },
  {
    role: "admin",
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    email: "user@mail.ru",
    login: "User",
    password: "User",
  },
  {
    email: "user1@mail.ru",
    login: "User 1",
    password: "User 1",
  },
  {
    email: "user2@mail.ru",
    login: "User 2",
    password: "User 2",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const r of roleData) {
    const role = await prisma.role.create({
      data: r,
    });
    console.log(`Created role with id: ${role.id}`);
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
