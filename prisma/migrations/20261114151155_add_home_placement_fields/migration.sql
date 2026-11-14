-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "HomePlacementType" ADD VALUE 'HOME_TRENDING';
ALTER TYPE "HomePlacementType" ADD VALUE 'HOME_CATEGORY';

-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "placement" "HomePlacementType" NOT NULL DEFAULT 'HOME_HERO';

-- CreateIndex
CREATE INDEX "Home_placement_idx" ON "Home"("placement");

-- CreateIndex
CREATE INDEX "Home_placement_order_idx" ON "Home"("placement", "order");
