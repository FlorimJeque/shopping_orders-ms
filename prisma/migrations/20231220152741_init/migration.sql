-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
