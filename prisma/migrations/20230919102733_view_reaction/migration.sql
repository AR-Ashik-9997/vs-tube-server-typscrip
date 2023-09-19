-- CreateTable
CREATE TABLE "viewreactions" (
    "id" TEXT NOT NULL,
    "likes" TEXT NOT NULL DEFAULT '0',
    "dislikes" TEXT NOT NULL DEFAULT '0',
    "playlistId" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viewreactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "viewreactions" ADD CONSTRAINT "viewreactions_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewreactions" ADD CONSTRAINT "viewreactions_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "reactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
