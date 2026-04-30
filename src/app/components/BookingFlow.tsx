"use client";

import { useEffect, useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import type { PackageType, Reservation } from "./bookingAvailability";
import {
  anyReservationTouchesDay,
  computeAvailableStartTimes,
} from "./bookingAvailability";
import { getReservations } from "./actions";
import { formatBucharestDate } from "../../../lib/bucharestTime";

export default function BookingFlow() {
  const [packageType, setPackageType] = useState<PackageType>("premium");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const [reservations, setReservations] = useState<Reservation[]>([]);
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
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const vipDayTaken = useMemo(() => {
    if (!date) return false;
    return anyReservationTouchesDay(reservations, date);
  }, [date, reservations]);

  const slotInfo = useMemo(() => {
    if (!date) return null;
    return computeAvailableStartTimes({
      pkg: packageType,
      date,
      reservations,
      openHour: 10,
      closeHour: 20,
      stepMinutes: 60,
    });
  }, [date, packageType, reservations]);

  return (
    <section
      id="booking-form"
      className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/20 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-headline font-extrabold text-on-surface">
              Pick your package &amp; date
            </h3>
            <p className="text-on-surface-variant max-w-xl">
              VIP blocks entire days that already have any reservation. Basic &amp;
              Premium keep all future dates selectable, but disable already-booked
              time slots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setPackageType("basic");
                setTime(null);
              }}
              className={[
                "rounded-2xl px-5 py-4 text-left border transition-colors",
                packageType === "basic"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container",
              ].join(" ")}
            >
              <div className="font-headline font-extrabold">Basic</div>
              <div className="text-sm opacity-80">2 hours</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPackageType("premium");
                setTime(null);
              }}
              className={[
                "rounded-2xl px-5 py-4 text-left border transition-colors",
                packageType === "premium"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container",
              ].join(" ")}
            >
              <div className="font-headline font-extrabold">Premium</div>
              <div className="text-sm opacity-80">4 hours</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPackageType("vip");
                setTime(null);
              }}
              className={[
                "rounded-2xl px-5 py-4 text-left border transition-colors",
                packageType === "vip"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container",
              ].join(" ")}
            >
              <div className="font-headline font-extrabold">VIP</div>
              <div className="text-sm opacity-80">Whole day</div>
            </button>
          </div>

          <BookingCalendar
            packageType={packageType}
            reservations={reservations}
            value={date}
            onChange={(d) => {
              setDate(d);
              setTime(null);
            }}
          />
        </div>

        <div className="w-full lg:w-[380px] space-y-6">
          <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm p-6">
            <h4 className="text-xl font-headline font-extrabold text-on-surface mb-2">
              Availability
            </h4>

            {!date ? (
              <p className="text-on-surface-variant">
                Select a date to see available hours.
              </p>
            ) : packageType === "vip" ? (
              <div className="space-y-2">
                <p className="text-on-surface-variant">
                  VIP requires exclusive access for the whole day.
                </p>
                <div
                  className={[
                    "rounded-2xl px-4 py-3 text-sm font-medium",
                    vipDayTaken
                      ? "bg-error-container text-on-error-container"
                      : "bg-secondary-container text-on-secondary-container",
                  ].join(" ")}
                >
                  {vipDayTaken ? "Unavailable (already booked)" : "Available"}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-on-surface-variant text-sm">
                  Pick a start time. Booked slots are disabled.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {slotInfo?.slots.map((slot) => {
                    const isDisabled = slotInfo.disabled.has(slot);
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setTime(slot)}
                        className={[
                          "rounded-xl px-3 py-2 text-sm font-headline font-bold border transition-colors",
                          isDisabled
                            ? "opacity-40 cursor-not-allowed bg-surface-container border-outline-variant/20"
                            : isSelected
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm p-6">
            <h4 className="text-xl font-headline font-extrabold text-on-surface mb-3">
              Selected
            </h4>
            <div className="space-y-2 text-on-surface-variant">
              <div>
                <span className="font-headline font-bold text-on-surface">
                  Package:
                </span>{" "}
                {packageType.toUpperCase()}
              </div>
              <div>
                <span className="font-headline font-bold text-on-surface">
                  Date:
                </span>{" "}
                {date ? formatBucharestDate(date) : "—"}
              </div>
              <div>
                <span className="font-headline font-bold text-on-surface">
                  Time:
                </span>{" "}
                {packageType === "vip" ? "— (whole day)" : time || "—"}
              </div>
            </div>

            <button
              type="button"
              disabled={!date || (packageType !== "vip" && !time)}
              className="mt-6 w-full bg-tertiary text-on-tertiary font-headline font-bold py-4 rounded-2xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              Continue to details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

