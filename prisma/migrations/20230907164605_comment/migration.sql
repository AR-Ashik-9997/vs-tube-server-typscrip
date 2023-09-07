/*
  Warnings:

  - Added the required column `image` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
