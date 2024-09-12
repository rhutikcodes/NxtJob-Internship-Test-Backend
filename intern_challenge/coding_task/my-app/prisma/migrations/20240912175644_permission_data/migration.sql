/*
  Warnings:

  - You are about to drop the `collaborator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `version` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collaborator` DROP FOREIGN KEY `Collaborator_documentId_fkey`;

-- DropForeignKey
ALTER TABLE `collaborator` DROP FOREIGN KEY `Collaborator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `version` DROP FOREIGN KEY `Version_documentId_fkey`;

-- AlterTable
ALTER TABLE `document` MODIFY `content` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `collaborator`;

-- DropTable
DROP TABLE `version`;

-- CreateTable
CREATE TABLE `DocumentVersion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `documentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `documentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DocumentVersion` ADD CONSTRAINT `DocumentVersion_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentPermission` ADD CONSTRAINT `DocumentPermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentPermission` ADD CONSTRAINT `DocumentPermission_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
