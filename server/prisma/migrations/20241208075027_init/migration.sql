/*
  Warnings:

  - You are about to drop the column `permissions` on the `SharedMemory` table. All the data in the column will be lost.
  - You are about to drop the column `sharedWith` on the `SharedMemory` table. All the data in the column will be lost.
  - You are about to drop the `_SharedMemoryToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `mediaUrl` on table `Memory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_SharedMemoryToUser" DROP CONSTRAINT "_SharedMemoryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SharedMemoryToUser" DROP CONSTRAINT "_SharedMemoryToUser_B_fkey";

-- AlterTable
ALTER TABLE "Memory" ALTER COLUMN "mediaUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "SharedMemory" DROP COLUMN "permissions",
DROP COLUMN "sharedWith";

-- DropTable
DROP TABLE "_SharedMemoryToUser";

-- CreateTable
CREATE TABLE "SharedWithUser" (
    "id" TEXT NOT NULL,
    "sharedMemoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissions" "Permission"[] DEFAULT ARRAY['read']::"Permission"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedWithUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SharedWithUser_sharedMemoryId_idx" ON "SharedWithUser"("sharedMemoryId");

-- CreateIndex
CREATE INDEX "SharedWithUser_userId_idx" ON "SharedWithUser"("userId");

-- CreateIndex
CREATE INDEX "SharedMemory_memoryId_idx" ON "SharedMemory"("memoryId");

-- AddForeignKey
ALTER TABLE "SharedWithUser" ADD CONSTRAINT "SharedWithUser_sharedMemoryId_fkey" FOREIGN KEY ("sharedMemoryId") REFERENCES "SharedMemory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedWithUser" ADD CONSTRAINT "SharedWithUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
