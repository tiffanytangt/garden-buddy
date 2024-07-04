-- DropForeignKey
ALTER TABLE `JournalEntryPhoto` DROP FOREIGN KEY `JournalEntryPhoto_journalEntryId_fkey`;

-- AddForeignKey
ALTER TABLE `JournalEntryPhoto` ADD CONSTRAINT `JournalEntryPhoto_journalEntryId_fkey` FOREIGN KEY (`journalEntryId`) REFERENCES `JournalEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `JournalEntry` DROP FOREIGN KEY `JournalEntry_plantId_fkey`;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;