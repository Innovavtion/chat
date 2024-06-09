import { PrismaClient } from "@prisma/client";

import { seedUser } from "./data/user";
import { seedFriend } from "./data/friend";
import { seedChat } from "./data/chat";
import { seedParticipant } from "./data/participant";
import { seedMessage } from "./data/message";

const prisma = new PrismaClient();

async function seedData() {
  console.log(`Delete all data ...`);

  await prisma.user.deleteMany();
  await prisma.friend.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.message.deleteMany();

  console.log(`Start seeding ...`);

  await seedUser(prisma);
  await seedFriend(prisma);
  await seedChat(prisma);
  await seedParticipant(prisma);
  await seedMessage(prisma);

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
