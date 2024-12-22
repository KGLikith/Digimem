/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Albums` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Albums_title_key" ON "Albums"("title");
