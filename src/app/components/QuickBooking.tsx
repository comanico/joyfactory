// app/components/QuickBooking.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  createPaymentIntent,
  finalizeBookingAfterStripePayment,
  getPackageDepositQuotes,
  getReservations,
} from './actions';
import { formatDepositForButton, PACKAGE_DEPOSIT_LEI } from '@/lib/packages';
import { toast } from 'sonner';
import BookingCalendar from './BookingCalendar';
import { useTranslation } from "react-i18next";
import type { Reservation } from './bookingAvailability';
import { computeAvailableStartTimes } from './bookingAvailability';
import {
  isPackageType,
  type PackageType,
} from '@/lib/packages';
import {
  PackageDetailsCard,
  PackageTypeButtons,
  TimeSlotPicker,
} from './PackageBookingPanel';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PayConfirmButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full min-h-[4.75rem] px-6 py-5 rounded-3xl font-headline font-bold text-center text-base sm:text-lg leading-snug text-pretty transition-all shadow-lg
        ${
          disabled
            ? "bg-primary/15 text-primary opacity-60 cursor-not-allowed"
            : "bg-primary text-on-primary hover:scale-[1.02]"
        }`}
    >
      {label}
    </button>
  );
}

export default function QuickBooking(props: {
  initialPackage?: string;
  initialDateISO?: string;
  initialTime?: string;
}) {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [packageType, setPackageType] = useState<PackageType>('basic');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [depositQuotes, setDepositQuotes] = useState<
    Record<PackageType, { depositLei: number }> | null
  >(null);

  useEffect(() => {
    const pkg = props.initialPackage;
    const dateISO = props.initialDateISO;
    const time = props.initialTime;

    if (isPackageType(pkg)) {
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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const quotes = await getPackageDepositQuotes();
        if (!cancelled) setDepositQuotes(quotes);
      } catch {
        // Fallback to generic pay label if Stripe metadata is unavailable.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const payButtonLabel = useMemo(() => {
    if (isLoading) return t("booking.preparingPayment");
    const depositLei =
      depositQuotes?.[packageType]?.depositLei ?? PACKAGE_DEPOSIT_LEI[packageType];
    const amount = formatDepositForButton(depositLei);
    return t("booking.payDepositAmount", { amount });
  }, [depositQuotes, packageType, isLoading, t]);

  const slotInfo = useMemo(() => {
    if (!selectedDate) return null;
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
    if (!selectedDate || !selectedTime || !slotInfo) return false;
    if (!slotInfo.slots.includes(selectedTime)) return false;
    return !slotInfo.disabled.has(selectedTime);
  }, [selectedDate, selectedTime, slotInfo]);

  const isRequiredInfoComplete =
    firstName.trim() &&
    lastName.trim() &&
    phone.trim() &&
    email.trim();
  const isPackageSelectionComplete = Boolean(selectedDate && isSelectedTimeAvailable);

  const isFormComplete = Boolean(isRequiredInfoComplete && isPackageSelectionComplete);

  const selectPackage = (pkg: PackageType) => {
    setPackageType(pkg);
    setSelectedTime(null);
  };

  const handleCreatePayment = async () => {
    if (!isFormComplete) return;

    setIsLoading(true);

    try {
      const result = await createPaymentIntent({
        packageType,
        dateISO: selectedDate!.toISOString().slice(0, 10),
        timeHHMM: selectedTime,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      setClientSecret(result.clientSecret);
      setBookingId(result.bookingId);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("errors.startPaymentFailed", "Nu am putut porni plata. Încearcă din nou."),
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
        <h2 className="text-4xl font-headline font-extrabold text-primary">{t("booking.title")}</h2>
        <p className="text-on-surface-variant mt-3">{t("booking.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 items-stretch">
        
        {/* Calendar */}
        <div className="h-full flex flex-col">
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">{t("booking.selectDate")}</h3>
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
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">{t("booking.yourDetails")}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">{t("booking.firstName")}</label>
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
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">{t("booking.lastName")}</label>
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
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">{t("booking.email")}</label>
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
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">{t("booking.phone")}</label>
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
          {/* Mobile layout: selection -> details -> hours -> payment */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">
                {t("booking.choosePackage")}
              </label>
              <PackageTypeButtons packageType={packageType} onSelect={selectPackage} />
            </div>

            <PackageDetailsCard packageType={packageType} />

            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">
                {t("booking.selectStartTime")}
              </label>
              <TimeSlotPicker
                selectedDate={selectedDate}
                slotInfo={slotInfo}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
            </div>

            <PayConfirmButton
              label={payButtonLabel}
              disabled={!isFormComplete || isLoading}
              onClick={handleCreatePayment}
            />
          </div>

          {/* Desktop: selection in two columns, pay button full width below */}
          <div className="hidden md:flex md:flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">
                    {t("booking.choosePackage")}
                  </label>
                  <PackageTypeButtons packageType={packageType} onSelect={selectPackage} />
                </div>

                <div>
                  <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">
                    {t("booking.selectStartTime")}
                  </label>
                  <TimeSlotPicker
                    selectedDate={selectedDate}
                    slotInfo={slotInfo}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    gridClassName="grid grid-cols-6 gap-2 auto-rows-fr"
                  />
                </div>
              </div>

              <PackageDetailsCard packageType={packageType} />
            </div>

            <PayConfirmButton
              label={payButtonLabel}
              disabled={!isFormComplete || isLoading}
              onClick={handleCreatePayment}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Embedded Stripe Payment Form
function EmbeddedPaymentForm({ onPaid }: { onPaid: () => void }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
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
      toast.error(result.error.message || t("errors.paymentFailed", "Plata a eșuat"));
    } else if (result.paymentIntent?.status === "succeeded") {
      try {
        const { bookingId: confirmedId } = await finalizeBookingAfterStripePayment({
          paymentIntentId: result.paymentIntent.id,
          lang: (i18n.language === "en" ? "en" : "ro") as "ro" | "en",
        });
        toast.success(t("toasts.paymentSuccess", "Plata a reușit! Rezervarea ta este confirmată."));
        onPaid();
        router.push(`/reservation/${confirmedId}`);
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : t("errors.confirmationFailed", "Plata a reușit, dar confirmarea a eșuat."),
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
        {isProcessing ? t("booking.processingPayment") : t("booking.completePayment")}
      </button>
    </form>
  );
}