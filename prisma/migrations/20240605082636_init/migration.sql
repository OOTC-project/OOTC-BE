/*
  Warnings:

  - Added the required column `fkMemberId` to the `Clothes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkMemberId` to the `Cody` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clothes` ADD COLUMN `fkMemberId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Cody` ADD COLUMN `fkMemberId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Member` MODIFY `profileImg` VARCHAR(191) NULL,
    MODIFY `backgroundImg` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Cody_fkMemberId_fkey` ON `Cody`(`fkMemberId`);

-- AddForeignKey
ALTER TABLE `Cody` ADD CONSTRAINT `Cody_fkMemberId_fkey` FOREIGN KEY (`fkMemberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clothes` ADD CONSTRAINT `Clothes_fkMemberId_fkey` FOREIGN KEY (`fkMemberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
