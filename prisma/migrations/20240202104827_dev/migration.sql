-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_customerId_fkey`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
