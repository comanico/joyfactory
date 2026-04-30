-- Store Stripe PaymentIntent id for reconciliation.
ALTER TABLE `Booking`
  ADD COLUMN `stripePaymentIntentId` VARCHAR(191) NULL;

