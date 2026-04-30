-- Add package type to bookings for package-aware availability.
ALTER TABLE `Booking`
  ADD COLUMN `packageType` VARCHAR(20) NOT NULL DEFAULT 'basic';

