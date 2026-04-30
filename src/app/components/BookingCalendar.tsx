"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "vanilla-calendar-pro";
import type { PackageType, Reservation } from "./bookingAvailability";
import { computeDisabledDatesForPackage, toISODateLocal } from "./bookingAvailability";

function getIsoDateFromEl(el: HTMLElement | null): string | null {
  if (!el) return null;

  // Vanilla Calendar Pro docs: each day element has a data attribute with `YYYY-MM-DD`,
  // but the attribute name can vary by version/layout.
  const direct =
    el.getAttribute("data-vc-date") ||
    el.getAttribute("data-calendar-date") ||
    el.getAttribute("data-date");
  if (direct && /^\d{4}-\d{2}-\d{2}$/.test(direct)) return direct;

  // Last resort: scan attributes for a `YYYY-MM-DD` value.
  for (const name of el.getAttributeNames()) {
    const value = el.getAttribute(name);
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  }
  return null;
}

function getIsoDateFromEventTarget(params: {
  target: HTMLElement | null;
  root: HTMLElement | null;
}): string | null {
  const { target, root } = params;
  if (!target) return null;

  // Walk up from the click target to the calendar root and try to extract an ISO date.
  let el: HTMLElement | null = target;
  while (el) {
    const iso = getIsoDateFromEl(el);
    if (iso) return iso;

    // Some layouts keep the date attribute on a child (e.g. a button inside `.vc-date`).
    const childWithIso =
      (el.querySelector?.("[data-vc-date]") as HTMLElement | null) ??
      (el.querySelector?.("[data-calendar-date]") as HTMLElement | null) ??
      (el.querySelector?.("[data-date]") as HTMLElement | null);
    const childIso = getIsoDateFromEl(childWithIso);
    if (childIso) return childIso;

    if (root && el === root) break;
    el = el.parentElement;
  }
  return null;
}

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
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
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
    if (!rootEl) return;
    if (calendarRef.current) return;

    const calendar = new Calendar(rootEl, {
      selectionDatesMode: "single",
      disableDatesPast: true,
      enableJumpToSelectedDate: true,
      // Switching by 2 makes it look like months are "missing" (May/July, etc.).
      monthsToSwitch: 1,
      selectedTheme: "light",
      onCreateDateEls(self, dateEl) {
        dateEl.classList.add("jf-cal-day");

        // Make VIP-disabled dates feel "hard disabled" visually.
        if (packageTypeRef.current === "vip") {
          const d = getIsoDateFromEl(dateEl);
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
        const isoFromDom = getIsoDateFromEventTarget({
          target,
          root: rootRef.current,
        });

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
  }, [rootEl]);

  // Update when selection/availability changes.
  useEffect(() => {
    const cal = calendarRef.current;
    if (!cal) return;

    cal.set(
      {
        selectedDates: value ? [toISODateLocal(value)] : [],
        disableDates: disabledDates.length ? disabledDates : [],
      },
      { dates: true, month: true, year: true },
    );
  }, [disabledDates, value]);

  return (
    <div className="jf-calendar h-full flex flex-col">
      <div
        className="flex-1 min-h-[420px] rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm p-6"
        ref={(el) => {
          rootRef.current = el;
          setRootEl(el);
        }}
      />
    </div>
  );
}

