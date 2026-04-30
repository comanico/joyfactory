// app/components/actions.ts
'use server';

import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';
import type { PackageType, Reservation } from './bookingAvailability';
import {
  anyReservationTouchesDay,
  computeAvailableStartTimes,
  packageDurationHours,
} from './bookingAvailability';
import { sendConfirmationEmail, sendTestEmail } from './sendConfirmationEmail';
import { formatBucharestDate, formatBucharestTime } from '../../../lib/bucharestTime';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

function parseLocalDateTimeFromSelection(params: {
  dateISO: string; // YYYY-MM-DD
  timeHHMM?: string | null; // HH:MM (local), optional for VIP
  fallbackHour?: number;
}) {
  const { dateISO, timeHHMM, fallbackHour = 10 } = params;
  const [yyyy, mm, dd] = dateISO.split('-').map((p) => Number(p));

  const hourMinute = timeHHMM?.split(':').map((p) => Number(p));
  const hh = hourMinute?.[0];
  const min = hourMinute?.[1];

  if (
    typeof hh === 'number' &&
    Number.isFinite(hh) &&
    typeof min === 'number' &&
    Number.isFinite(min)
  ) {
    return new Date(yyyy, mm - 1, dd, hh, min, 0, 0);
  }

  return new Date(yyyy, mm - 1, dd, fallbackHour, 0, 0, 0);
}

function buildReservationRangeFromBooking(b: { startTime: Date; durationHours: number }): Reservation {
  return {
    start: b.startTime,
    end: new Date(b.startTime.getTime() + b.durationHours * 60 * 60_000),
  };
}

async function listConfirmedReservations(): Promise<Reservation[]> {
  const bookings = await prisma.booking.findMany({
    where: {
      depositPaid: true,
      status: { not: 'cancelled' },
    },
    select: { startTime: true, durationHours: true },
  });

  return bookings.map(buildReservationRangeFromBooking);
}

export async function getReservations() {
  const reservations = await listConfirmedReservations();
  // Dates cross the server/client boundary as strings; we reconstruct on the client.
  return reservations.map((r) => ({ start: r.start.toISOString(), end: r.end.toISOString() }));
}

function validateSelectionAgainstReservations(params: {
  pkg: PackageType;
  dateISO: string;
  timeHHMM?: string | null;
  reservations: Reservation[];
}) {
  const { pkg, dateISO, timeHHMM, reservations } = params;
  const date = parseLocalDateTimeFromSelection({ dateISO, fallbackHour: 12 });
  date.setHours(0, 0, 0, 0);

  if (pkg === 'vip') {
    if (anyReservationTouchesDay(reservations, date)) {
      throw new Error('Selected day is unavailable for VIP.');
    }
    return;
  }

  if (!timeHHMM) {
    throw new Error('Please select a start time.');
  }

  const slotInfo = computeAvailableStartTimes({
    pkg,
    date,
    reservations,
    openHour: 10,
    closeHour: 20,
    stepMinutes: 60,
  });

  if (!slotInfo.slots.includes(timeHHMM)) {
    throw new Error('Invalid start time selection.');
  }
  if (slotInfo.disabled.has(timeHHMM)) {
    throw new Error('Selected start time is unavailable.');
  }
}

export async function createPaymentIntent(data: {
  packageType: PackageType;
  dateISO: string; // YYYY-MM-DD
  timeHHMM?: string | null; // HH:MM, required for non-VIP
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

  const reservations = await listConfirmedReservations();
  validateSelectionAgainstReservations({
    pkg: data.packageType,
    dateISO: data.dateISO,
    timeHHMM: data.timeHHMM ?? null,
    reservations,
  });

  const startTime =
    data.packageType === 'vip'
      ? parseLocalDateTimeFromSelection({ dateISO: data.dateISO, fallbackHour: 10 })
      : parseLocalDateTimeFromSelection({ dateISO: data.dateISO, timeHHMM: data.timeHHMM, fallbackHour: 10 });

  const booking = await prisma.booking.create({
    data: {
      email: data.email || null,
      packageType: data.packageType,
      zone: 'General Play Zone',
      startTime,
      durationHours: data.packageType === 'vip' ? 10 : packageDurationHours(data.packageType),
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

export async function confirmBookingPaid(data: { bookingId: string }) {
  await prisma.booking.update({
    where: { id: data.bookingId },
    data: {
      status: 'confirmed',
      paymentStatus: 'paid',
      depositPaid: true,
    },
  });
}

export async function finalizeBookingAfterStripePayment(data: {
  paymentIntentId: string;
}) {
  const pi = await stripe.paymentIntents.retrieve(data.paymentIntentId);
  if (pi.status !== 'succeeded') {
    throw new Error('Payment not confirmed yet.');
  }

  const bookingId = pi.metadata?.bookingId;
  if (!bookingId) {
    throw new Error('Missing booking metadata on payment.');
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'confirmed',
      paymentStatus: 'paid',
      depositPaid: true,
      stripePaymentIntentId: pi.id,
    },
    select: {
      id: true,
      email: true,
      packageType: true,
      startTime: true,
      durationHours: true,
      numberOfGuests: true,
    },
  });

  if (booking.email) {
    const endTime = new Date(booking.startTime.getTime() + booking.durationHours * 60 * 60_000);

    try {
      await sendConfirmationEmail({
        email: booking.email,
        bookingId: booking.id,
        packageType: booking.packageType,
        date: formatBucharestDate(booking.startTime),
        startTime: formatBucharestTime(booking.startTime),
        endTime: formatBucharestTime(endTime),
        guests: booking.numberOfGuests,
      });
    } catch (e) {
      // Payment succeeded and booking is confirmed; keep the error explicit so it can be retried.
      throw new Error(
        `Booking confirmed, but email failed: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return { bookingId: booking.id };
}

export async function resendSmokeTest(data: { to: string }) {
  return await sendTestEmail({ to: data.to });
}

export async function getNextAvailableSelection(data: { packageType: PackageType }) {
  const reservations = await listConfirmedReservations();

  const openHour = 10;
  const closeHour = 20;
  const stepMinutes = 60;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDaysToScan = 120;

  for (let i = 0; i < maxDaysToScan; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);

    const dateISO = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;

    if (data.packageType === 'vip') {
      if (!anyReservationTouchesDay(reservations, day)) {
        return { dateISO, timeHHMM: null as string | null };
      }
      continue;
    }

    const slotInfo = computeAvailableStartTimes({
      pkg: data.packageType,
      date: day,
      reservations,
      openHour,
      closeHour,
      stepMinutes,
    });

    const firstAvailable = slotInfo.slots.find((s) => !slotInfo.disabled.has(s)) ?? null;
    if (firstAvailable) {
      return { dateISO, timeHHMM: firstAvailable };
    }
  }

  throw new Error('No available slots found in the next few months.');
}