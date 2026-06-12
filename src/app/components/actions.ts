// app/components/actions.ts
'use server';

import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';
import type { Reservation } from './bookingAvailability';
import {
  anyReservationTouchesDay,
  computeAvailableStartTimes,
} from './bookingAvailability';
import {
  isBookablePackage,
  isPackageType,
  packageGuestCount,
  packagePartyDurationHours,
  type PackageType,
} from '@/lib/packages';
import { partyEndTime, schedulingEndTime } from '@/lib/bookingTime';
import {
  fetchAllPackageDepositQuotes,
  fetchPackageDepositQuote,
} from '@/lib/stripePackages';
import { sendConfirmationEmail, sendTestEmail } from "./sendConfirmationEmail";
import {
  bucharestWallTimeToUtcDate,
  formatBucharestDate,
  formatBucharestTime,
} from "../../../lib/bucharestTime";
import { resolvedSiteUrl } from "../../lib/siteUrl";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

function parseBucharestDateTimeFromSelection(params: {
  dateISO: string; // YYYY-MM-DD
  timeHHMM?: string | null; // HH:MM (Bucharest wall time), optional for VIP
  fallbackHour?: number;
}) {
  return bucharestWallTimeToUtcDate(params);
}

function buildReservationRangeFromBooking(b: {
  startTime: Date;
  durationHours: number;
}): Reservation {
  return {
    start: b.startTime,
    end: schedulingEndTime(b.startTime, b.durationHours),
  };
}

async function listConfirmedReservations(): Promise<Reservation[]> {
  const bookings = await prisma.booking.findMany({
    where: {
      depositPaid: true,
      status: { not: 'cancelled' },
    },
    select: { startTime: true, durationHours: true, packageType: true },
  });

  return bookings.map(buildReservationRangeFromBooking);
}

export async function getPackageDepositQuotes() {
  const quotes = await fetchAllPackageDepositQuotes(stripe);
  return Object.fromEntries(
    Object.entries(quotes).map(([pkg, q]) => [
      pkg,
      {
        depositLei: q.depositLei,
        fullPriceLei: q.fullPriceLei,
        name: q.name,
      },
    ]),
  ) as Record<
    PackageType,
    { depositLei: number; fullPriceLei: number; name: string }
  >;
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
  // Interpret day boundaries in Bucharest so VIP day blocking matches the UX.
  const date = parseBucharestDateTimeFromSelection({
    dateISO,
    timeHHMM: "00:00",
    fallbackHour: 0,
  });

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
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}) {
  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  if (!firstName || !lastName || !phone) {
    throw new Error("Please enter your full contact details before paying.");
  }
  if (!email) {
    throw new Error("Please enter your email so we can send your confirmation and reservation link.");
  }

  if (!isPackageType(data.packageType)) {
    throw new Error("Invalid package selection.");
  }
  if (!isBookablePackage(data.packageType)) {
    throw new Error("This package is no longer available for online booking.");
  }

  const quote = await fetchPackageDepositQuote(stripe, data.packageType);
  // Stripe Price is already the 10% deposit; metadata `full_price` is the package total in LEI.
  const depositAmount = quote.depositAmountMinor;
  const fullAmount = quote.fullAmountMinor;

  const reservations = await listConfirmedReservations();
  validateSelectionAgainstReservations({
    pkg: data.packageType,
    dateISO: data.dateISO,
    timeHHMM: data.timeHHMM ?? null,
    reservations,
  });

  const startTime = parseBucharestDateTimeFromSelection({
    dateISO: data.dateISO,
    timeHHMM: data.timeHHMM,
    fallbackHour: 10,
  });

  const booking = await prisma.booking.create({
    data: {
      firstName,
      lastName,
      phone,
      email,
      packageType: data.packageType,
      zone: 'General Play Zone',
      startTime,
      durationHours: packagePartyDurationHours(data.packageType),
      numberOfGuests: packageGuestCount(data.packageType),
      status: 'pending',
      paymentStatus: 'pending',
      depositPaid: false,
      fullAmount,
      depositAmount,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: depositAmount,
    currency: 'ron',
    payment_method_types: ["card"],
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
  lang?: "ro" | "en";
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
      status: "confirmed",
      paymentStatus: "paid",
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

  const email = booking.email?.trim();
  if (!email) {
    throw new Error(
      "Email is required to complete your booking. Please contact us with your payment receipt.",
    );
  }

  const endTime = partyEndTime(booking.startTime, booking.durationHours);
  const base = await resolvedSiteUrl();
  const reservationUrl = `${base}/reservation/${booking.id}`;

  try {
    await sendConfirmationEmail({
      email,
      reservationUrl,
      bookingId: booking.id,
      packageType: booking.packageType,
      date: formatBucharestDate(booking.startTime),
      startTime: formatBucharestTime(booking.startTime),
      endTime: formatBucharestTime(endTime),
      guests: booking.numberOfGuests,
      lang: data.lang === "en" ? "en" : "ro",
    });
  } catch (e) {
    throw new Error(
      `Booking confirmed, but email failed: ${e instanceof Error ? e.message : String(e)}`,
    );
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