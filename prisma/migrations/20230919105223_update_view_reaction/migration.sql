/*
  Warnings:

  - You are about to drop the column `reactionId` on the `viewreactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "viewreactions" DROP CONSTRAINT "viewreactions_reactionId_fkey";

-- AlterTable
ALTER TABLE "viewreactions" DROP COLUMN "reactionId";
