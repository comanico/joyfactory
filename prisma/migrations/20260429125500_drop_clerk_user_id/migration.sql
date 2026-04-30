-- Remove Clerk dependency from DB schema.
ALTER TABLE `Booking`
  DROP COLUMN `clerkUserId`;

