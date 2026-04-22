"use client";

import { useEffect, useMemo, useRef } from "react";
import { Calendar } from "vanilla-calendar-pro";
import type { PackageType, Reservation } from "./bookingAvailability";
import { computeDisabledDatesForPackage, toISODateLocal } from "./bookingAvailability";

type Props = {
  packageType: PackageType;
  reservations: Reservation[];
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export default function BookingCalendar({
  packageType,
  reservations,
  value,
  onChange,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<Calendar | null>(null);
  const onChangeRef = useRef(onChange);
  const disabledDatesRef = useRef<string[]>([]);
  const packageTypeRef = useRef<PackageType>(packageType);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    packageTypeRef.current = packageType;
  }, [packageType]);

  const disabledDates = useMemo(
    () => computeDisabledDatesForPackage(packageType, reservations),
    [packageType, reservations],
  );

  useEffect(() => {
    disabledDatesRef.current = disabledDates;
  }, [disabledDates]);

  // Init once (do not destroy/recreate on every prop change).
  useEffect(() => {
    if (!rootRef.current) return;
    if (calendarRef.current) return;

    const calendar = new Calendar(rootRef.current, {
      selectionDatesMode: "single",
      disableDatesPast: true,
      monthsToSwitch: 2,
      selectedTheme: "light",
      onCreateDateEls(self, dateEl) {
        dateEl.classList.add("jf-cal-day");

        // Make VIP-disabled dates feel "hard disabled" visually.
        if (packageTypeRef.current === "vip") {
          const d = dateEl.getAttribute("data-calendar-date");
          if (d && disabledDatesRef.current.includes(d)) {
            dateEl.setAttribute(
              "title",
              "Unavailable (VIP requires whole-day exclusivity)",
            );
          }
        }
      },
      onClickDate(self, event) {
        const target = event.target as HTMLElement | null;
        const dateEl = target?.closest?.("[data-calendar-date]") as HTMLElement | null;
        const isoFromDom = dateEl?.getAttribute?.("data-calendar-date");

        // Prefer the clicked element's date. Calendar context can lag behind by 1 click.
        const isoFromContext = self.context.selectedDates?.[0];
        const iso = isoFromDom || isoFromContext;
        if (!iso) return;

        // Calendar already prevents click for disabled dates; this is just a guard.
        if (disabledDatesRef.current.includes(iso)) return;

        // Avoid timezone shifts (treat ISO date as a local calendar day).
        const [yyyy, mm, dd] = iso.split("-").map((p) => Number(p));
        const picked = new Date(yyyy, mm - 1, dd);
        onChangeRef.current(picked);
      },
    });

    calendar.init();
    calendarRef.current = calendar;

    return () => {
      calendarRef.current?.destroy?.();
      calendarRef.current = null;
    };
  }, []);

  // Update when selection/availability changes.
  useEffect(() => {
    const cal = calendarRef.current;
    if (!cal) return;

    cal.set(
      {
        selectedDates: value ? [toISODateLocal(value)] : [],
        disableDates: disabledDates.length ? disabledDates : [],
      },
      { dates: true },
    );
  }, [disabledDates, value]);

  return (
    <div className="jf-calendar h-full flex flex-col">
      <div
        className="flex-1 min-h-[420px] rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm p-6"
        ref={rootRef}
      />
    </div>
  );
}

