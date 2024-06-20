/*
  Warnings:

  - A unique constraint covering the columns `[photo_id]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Plant` ADD COLUMN `photo_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Plant_photo_id_key` ON `Plant`(`photo_id`);

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_photo_id_fkey` FOREIGN KEY (`photo_id`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
