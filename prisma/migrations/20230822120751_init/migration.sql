-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_listId_fkey" FOREIGN KEY ("listId") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
