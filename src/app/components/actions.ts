// app/components/actions.ts
'use server';

import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function createPaymentIntent(data: {
  packageType: 'basic' | 'premium' | 'vip';
  email?: string;
}) {
  const priceIdMap: Record<string, string> = {
    basic: process.env.STRIPE_PRICE_BASIC!,
    premium: process.env.STRIPE_PRICE_PREMIUM!,
    vip: process.env.STRIPE_PRICE_VIP!,
  };

  const fullPriceId = priceIdMap[data.packageType];

  const price = await stripe.prices.retrieve(fullPriceId);
  const depositAmount = Math.round((price.unit_amount || 0) * 0.1);

  const booking = await prisma.booking.create({
    data: {
      // Guests can book without logging in; we use a stable placeholder.
      clerkUserId: 'guest',
      email: data.email || null,
      zone: 'General Play Zone',
      startTime: new Date(), // we'll update this with real date later if needed
      durationHours: data.packageType === 'basic' ? 2 : data.packageType === 'premium' ? 4 : 8,
      numberOfGuests: data.packageType === 'basic' ? 10 : data.packageType === 'premium' ? 20 : 99,
      status: 'pending',
      paymentStatus: 'pending',
      depositPaid: false,
      fullAmount: price.unit_amount || 0,
      depositAmount: depositAmount,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: depositAmount,
    currency: 'ron',
    metadata: {
      bookingId: booking.id,
      packageType: data.packageType,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    bookingId: booking.id,
  };
}