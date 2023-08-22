-- CreateTable
CREATE TABLE "yt_playlists" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "yt_playlists_pkey" PRIMARY KEY ("id")
);
