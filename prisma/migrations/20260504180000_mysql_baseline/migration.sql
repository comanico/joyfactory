-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `packageType` VARCHAR(191) NOT NULL DEFAULT 'basic',
    `zone` VARCHAR(191) NOT NULL DEFAULT 'General Play Zone',
    `startTime` DATETIME(3) NOT NULL,
    `durationHours` INTEGER NOT NULL,
    `numberOfGuests` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `stripeSessionId` VARCHAR(191) NULL,
    `stripePaymentIntentId` VARCHAR(191) NULL,
    `depositPaid` BOOLEAN NOT NULL DEFAULT false,
    `fullAmount` INTEGER NOT NULL DEFAULT 0,
    `depositAmount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Booking_startTime_idx`(`startTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gdpr` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `preferences` JSON NOT NULL,
    `version` VARCHAR(191) NOT NULL DEFAULT '1.0',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
