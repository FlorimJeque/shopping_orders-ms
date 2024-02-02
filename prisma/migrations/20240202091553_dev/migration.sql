/*
  Warnings:

  - You are about to drop the column `quatity` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `quatity`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
