// app/components/QuickBooking.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, finalizeBookingAfterStripePayment, getReservations } from './actions';
import { toast } from 'sonner';
import BookingCalendar from './BookingCalendar';
import type { Reservation } from './bookingAvailability';
import {
  anyReservationTouchesDay,
  computeAvailableStartTimes,
} from './bookingAvailability';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function QuickBooking(props: {
  initialPackage?: string;
  initialDateISO?: string;
  initialTime?: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [packageType, setPackageType] = useState<'basic' | 'premium' | 'vip'>('basic');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const pkg = props.initialPackage;
    const dateISO = props.initialDateISO;
    const time = props.initialTime;

    if (pkg === "basic" || pkg === "premium" || pkg === "vip") {
      setPackageType(pkg);
    }

    if (dateISO && /^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      const [yyyy, mm, dd] = dateISO.split("-").map((p) => Number(p));
      setSelectedDate(new Date(yyyy, mm - 1, dd));
    }

    if (time && /^\d{2}:\d{2}$/.test(time)) {
      setSelectedTime(time);
    }
  }, [props.initialDateISO, props.initialPackage, props.initialTime]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await getReservations();
        if (cancelled) return;
        setReservations(
          raw.map((r) => ({
            start: new Date(r.start),
            end: new Date(r.end),
          })),
        );
      } catch {
        // Reservations are best-effort UI help; server validation is authoritative.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const vipDayTaken = useMemo(() => {
    if (!selectedDate) return false;
    return anyReservationTouchesDay(reservations, selectedDate);
  }, [reservations, selectedDate]);

  const slotInfo = useMemo(() => {
    if (!selectedDate || packageType === 'vip') return null;
    return computeAvailableStartTimes({
      pkg: packageType,
      date: selectedDate,
      reservations,
      openHour: 10,
      closeHour: 20,
      stepMinutes: 60,
    });
  }, [packageType, reservations, selectedDate]);

  const handleCalendarChange = useCallback((d: Date | null) => {
    setSelectedDate(d);
    setSelectedTime(null);
  }, []);

  const isSelectedTimeAvailable = useMemo(() => {
    if (packageType === 'vip') return !vipDayTaken;
    if (!selectedDate || !selectedTime || !slotInfo) return false;
    if (!slotInfo.slots.includes(selectedTime)) return false;
    return !slotInfo.disabled.has(selectedTime);
  }, [packageType, selectedDate, selectedTime, slotInfo, vipDayTaken]);

  const isRequiredInfoComplete =
    firstName.trim() &&
    lastName.trim() &&
    phone.trim() &&
    email.trim();
  const isPackageSelectionComplete = Boolean(selectedDate && isSelectedTimeAvailable);

  const isFormComplete = Boolean(isRequiredInfoComplete && isPackageSelectionComplete);

  const handleCreatePayment = async () => {
    if (!isFormComplete) return;

    setIsLoading(true);

    try {
      const result = await createPaymentIntent({
        packageType,
        dateISO: selectedDate!.toISOString().slice(0, 10),
        timeHHMM: packageType === "vip" ? null : selectedTime,
        email: email.trim(),
      });
      setClientSecret(result.clientSecret);
      setBookingId(result.bookingId);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to start payment. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <Elements
        key={bookingId ?? "checkout"}
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedPaymentForm
          onPaid={() => {
            setClientSecret(null);
            setBookingId(null);
          }}
        />
      </Elements>
    );
  }

  return (
    <section id="booking-form" className="mt-20 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-primary">Book Your Joy Session</h2>
        <p className="text-on-surface-variant mt-3">Choose a date and package — we’ll take care of the rest</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 items-stretch">
        
        {/* Calendar */}
        <div className="h-full flex flex-col">
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">Select a Date</h3>
          <div className="flex-1">
            <BookingCalendar
              packageType={packageType}
              reservations={reservations}
              value={selectedDate}
              onChange={handleCalendarChange}
            />
          </div>
        </div>

        {/* Form */}
        <div className="h-full flex flex-col">
          <div className="space-y-6 flex-1">
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">Your Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">First Name</label>
              <input
                className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary"
                placeholder="Alex"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Last Name</label>
              <input
                className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary"
                placeholder="Joyner"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Email address</label>
            <input
              className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Phone Number</label>
            <input
              className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary"
              placeholder="+1 (555) 123-4567"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          </div>
        </div>

        {/* Package + Time + Payment (full width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Package Selector */}
          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">Choose Package</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setPackageType('basic'); setSelectedTime(null); }}
                className={`w-full py-4 text-sm font-headline font-bold rounded-3xl transition-all border-2
                  ${packageType === 'basic' ? 'bg-primary text-white shadow-md border-primary' : 'bg-surface-container-highest border-outline-variant/20 hover:bg-white/60 text-on-surface-variant'}`}
              >
                Basic Fun
              </button>
              <button
                type="button"
                onClick={() => { setPackageType('premium'); setSelectedTime(null); }}
                className={`w-full py-4 text-sm font-headline font-bold rounded-3xl transition-all border-2
                  ${packageType === 'premium' ? 'bg-primary text-white shadow-md border-primary' : 'bg-surface-container-highest border-outline-variant/20 hover:bg-white/60 text-on-surface-variant'}`}
              >
                Premium Joy
              </button>
              <button
                type="button"
                onClick={() => { setPackageType('vip'); setSelectedTime(null); }}
                className={`w-full py-4 text-sm font-headline font-bold rounded-3xl transition-all border-2
                  ${packageType === 'vip' ? 'bg-primary text-white shadow-md border-primary' : 'bg-surface-container-highest border-outline-variant/20 hover:bg-white/60 text-on-surface-variant'}`}
              >
                VIP Utopia
              </button>
            </div>
          </div>

          {/* Time Slots */}
          {packageType !== 'vip' && (
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">Select Start Time</label>
              {!selectedDate ? (
                <div className="rounded-3xl bg-surface-container text-on-surface-variant px-6 py-4 text-sm font-medium">
                  Select a date to see available start times.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {(slotInfo?.slots ?? []).map((time) => {
                    const isSelected = selectedTime === time;
                    const isDisabled = slotInfo?.disabled.has(time) ?? false;
                    return (
                      <button
                        key={time}
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full px-4 py-3 text-base font-headline font-bold rounded-3xl border-2 transition-all
                          ${isDisabled ? 'opacity-50 cursor-not-allowed border-outline-variant/30 text-on-surface-variant bg-white/70' : isSelected ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {packageType === 'vip' && (
            <div
              className={[
                'rounded-3xl p-6 text-center font-headline font-bold text-lg',
                !selectedDate
                  ? 'bg-primary/10 text-primary'
                  : vipDayTaken
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-secondary-container text-on-secondary-container',
              ].join(' ')}
            >
              {!selectedDate
                ? 'All Day Access'
                : vipDayTaken
                  ? 'Unavailable'
                  : 'Available (whole day)'}
            </div>
          )}

          <button
            onClick={handleCreatePayment}
            disabled={!isFormComplete || isLoading}
            className={`w-full py-6 rounded-3xl font-headline font-bold text-xl transition-all shadow-lg
              ${isFormComplete ? 'bg-primary text-on-primary hover:scale-[1.02]' : 'bg-primary/15 text-primary opacity-60 cursor-not-allowed'}`}
          >
            {isLoading ? 'Preparing payment...' : 'Pay 10% Deposit & Confirm'}
          </button>
        </div>
      </div>
    </section>
  );
}

// Embedded Stripe Payment Form
function EmbeddedPaymentForm({ onPaid }: { onPaid: () => void }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (result.error) {
      toast.error(result.error.message || 'Payment failed');
    } else if (result.paymentIntent?.status === "succeeded") {
      try {
        const { bookingId: confirmedId } = await finalizeBookingAfterStripePayment({
          paymentIntentId: result.paymentIntent.id,
        });
        toast.success("Payment successful! Your booking is confirmed.");
        onPaid();
        router.push(`/reservation/${confirmedId}`);
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "Payment succeeded but confirmation failed.",
        );
        setIsProcessing(false);
        return;
      }
      return;
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary text-on-primary py-6 rounded-3xl font-headline font-bold text-xl hover:scale-[1.02] transition-transform"
      >
        {isProcessing ? 'Processing payment...' : 'Complete Payment'}
      </button>
    </form>
  );
}