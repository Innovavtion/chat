-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "userInviteId" TEXT NOT NULL,
    "userReceivingId" TEXT NOT NULL,
    "statusInvite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_id_key" ON "friends"("id");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userInviteId_fkey" FOREIGN KEY ("userInviteId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userReceivingId_fkey" FOREIGN KEY ("userReceivingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
