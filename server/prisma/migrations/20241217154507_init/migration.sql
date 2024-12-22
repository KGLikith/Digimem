-- CreateTable
CREATE TABLE "Albums" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
