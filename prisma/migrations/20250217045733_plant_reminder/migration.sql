-- AlterTable
ALTER TABLE `Reminder` ADD COLUMN `plantId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
