-- AlterTable
ALTER TABLE `Job` MODIFY `notifySuccessCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `notifyFailedCount` INTEGER NOT NULL DEFAULT 0;
