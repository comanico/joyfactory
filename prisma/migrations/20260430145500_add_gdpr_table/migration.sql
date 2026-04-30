-- GDPR consent log table (server-side audit trail).
CREATE TABLE `gdpr` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NULL,
  `preferences` JSON NOT NULL,
  `version` VARCHAR(191) NOT NULL DEFAULT '1.0',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

