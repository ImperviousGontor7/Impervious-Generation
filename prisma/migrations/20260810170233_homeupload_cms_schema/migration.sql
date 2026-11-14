-- CreateEnum
CREATE TYPE "HomePlacementType" AS ENUM ('HOME_HERO', 'HOME_THIS_MONTH', 'HOME_MONTH_AGO', 'HOME_ROOT_SLIDER', 'HOME_BEHIND_EVENTS', 'HOME_FEATURED', 'HOME_FIRST_MID_YEAR', 'HOME_SECOND_MID_YEAR');

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_username_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "uploaderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePlacement" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "placement" "HomePlacementType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePlacement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Media_folder_idx" ON "Media"("folder");

-- CreateIndex
CREATE INDEX "Media_mimeType_idx" ON "Media"("mimeType");

-- CreateIndex
CREATE INDEX "Media_provider_idx" ON "Media"("provider");

-- CreateIndex
CREATE INDEX "Media_uploaderId_idx" ON "Media"("uploaderId");

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "Media"("createdAt");

-- CreateIndex
CREATE INDEX "Media_deletedAt_idx" ON "Media"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Media_provider_path_key" ON "Media"("provider", "path");

-- CreateIndex
CREATE INDEX "HomePlacement_placement_idx" ON "HomePlacement"("placement");

-- CreateIndex
CREATE INDEX "HomePlacement_placement_order_idx" ON "HomePlacement"("placement", "order");

-- CreateIndex
CREATE INDEX "HomePlacement_newsId_idx" ON "HomePlacement"("newsId");

-- CreateIndex
CREATE INDEX "HomePlacement_isActive_idx" ON "HomePlacement"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "HomePlacement_newsId_placement_key" ON "HomePlacement"("newsId", "placement");

-- CreateIndex
CREATE INDEX "About_deletedAt_idx" ON "About"("deletedAt");

-- CreateIndex
CREATE INDEX "Agenda_endDate_idx" ON "Agenda"("endDate");

-- CreateIndex
CREATE INDEX "Agenda_authorId_idx" ON "Agenda"("authorId");

-- CreateIndex
CREATE INDEX "Agenda_deletedAt_idx" ON "Agenda"("deletedAt");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE INDEX "Comment_deletedAt_idx" ON "Comment"("deletedAt");

-- CreateIndex
CREATE INDEX "Committee_startDate_idx" ON "Committee"("startDate");

-- CreateIndex
CREATE INDEX "Committee_deletedAt_idx" ON "Committee"("deletedAt");

-- CreateIndex
CREATE INDEX "CommitteeMember_deletedAt_idx" ON "CommitteeMember"("deletedAt");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_deletedAt_idx" ON "ContactMessage"("deletedAt");

-- CreateIndex
CREATE INDEX "Forum_createdAt_idx" ON "Forum"("createdAt");

-- CreateIndex
CREATE INDEX "Forum_views_idx" ON "Forum"("views");

-- CreateIndex
CREATE INDEX "Forum_deletedAt_idx" ON "Forum"("deletedAt");

-- CreateIndex
CREATE INDEX "Gallery_createdAt_idx" ON "Gallery"("createdAt");

-- CreateIndex
CREATE INDEX "Gallery_deletedAt_idx" ON "Gallery"("deletedAt");

-- CreateIndex
CREATE INDEX "Home_deletedAt_idx" ON "Home"("deletedAt");

-- CreateIndex
CREATE INDEX "News_publishedAt_idx" ON "News"("publishedAt");

-- CreateIndex
CREATE INDEX "News_views_idx" ON "News"("views");

-- CreateIndex
CREATE INDEX "News_createdAt_idx" ON "News"("createdAt");

-- CreateIndex
CREATE INDEX "News_deletedAt_idx" ON "News"("deletedAt");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomePlacement" ADD CONSTRAINT "HomePlacement_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
