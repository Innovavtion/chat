import { PrismaClient } from "@prisma/client";

import { seedUsers } from "./data/users";
import { seedChats } from "./data/chats";
import { seedParticipants } from "./data/participants";
import { seedMessages } from "./data/messages";

const prisma = new PrismaClient();

async function seedData() {
  console.log(`Delete all data ...`);

  await prisma.users.deleteMany();
  await prisma.chats.deleteMany();
  await prisma.participants.deleteMany();
  await prisma.messages.deleteMany();

  console.log(`Start seeding ...`);

  await seedUsers(prisma);
  await seedChats(prisma);
  await seedParticipants(prisma);
  await seedMessages(prisma);

  console.log(`Seeding finished.`);
}

seedData()
  .catch(async (e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Closing Connection");
    await prisma.$disconnect();
  });
