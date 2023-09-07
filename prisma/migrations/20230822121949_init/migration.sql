/*
  Warnings:

  - You are about to drop the column `listId` on the `comments` table. All the data in the column will be lost.
  - Added the required column `playlistId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_listId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "listId",
ADD COLUMN     "playlistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
