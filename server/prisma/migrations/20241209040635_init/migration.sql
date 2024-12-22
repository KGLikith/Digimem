-- AlterTable
ALTER TABLE "_MemoryToTag" ADD CONSTRAINT "_MemoryToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_MemoryToTag_AB_unique";
