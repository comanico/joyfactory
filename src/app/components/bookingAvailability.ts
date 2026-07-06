import { packageSchedulingBlockHours, type PackageType } from "@/lib/packages";

export type { PackageType };

export type Reservation = {
  start: Date;
  end: Date;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toISODateLocal(date: Date) {
  const p = bucharestParts(date);
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`;
}

export function bucharestTodayISO(now: Date = new Date()) {
  return toISODateLocal(now);
}

export function bucharestTomorrowISO(now: Date = new Date()) {
  const p = bucharestParts(now);
  const startOfTodayWallMs = Date.UTC(p.year, p.month - 1, p.day, 0, 0, 0, 0);
  return toISODateLocal(new Date(startOfTodayWallMs + 24 * 60 * 60_000));
}

export function isSameLocalDate(a: Date, b: Date) {
  const ap = bucharestParts(a);
  const bp = bucharestParts(b);
  return ap.year === bp.year && ap.month === bp.month && ap.day === bp.day;
}

const BUCHAREST_TZ = "Europe/Bucharest";

function bucharestParts(date: Date) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUCHAREST_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const map = new Map(parts.map((p) => [p.type, p.value]));

  return {
    year: Number(map.get("year")),
    month: Number(map.get("month")),
    day: Number(map.get("day")),
    hour: Number(map.get("hour")),
    minute: Number(map.get("minute")),
    second: Number(map.get("second")),
  };
}

function bucharestWallMs(date: Date) {
  const p = bucharestParts(date);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second, 0);
}

export function anyReservationTouchesDay(reservations: Reservation[], day: Date) {
  const d = bucharestParts(day);
  const startOfDayMs = Date.UTC(d.year, d.month - 1, d.day, 0, 0, 0, 0);
  const endOfDayMs = Date.UTC(d.year, d.month - 1, d.day, 23, 59, 59, 999);

  return reservations.some((r) => {
    const rs = bucharestWallMs(r.start);
    const re = bucharestWallMs(r.end);
    return rs <= endOfDayMs && re >= startOfDayMs;
  });
}

/** Days with any confirmed booking are unavailable (one party per day). */
export function computeDisabledDatesForPackage(
  _pkg: PackageType,
  reservations: Reservation[],
) {
  const disabled = new Set<string>();
  for (const r of reservations) {
    disabled.add(toISODateLocal(r.start));
  }
  return Array.from(disabled);
}

export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

/** Saturday and Sunday in Bucharest (calendar day from `date`). */
export function isBucharestWeekend(date: Date): boolean {
  const iso = toISODateLocal(date);
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return dow === 0 || dow === 6;
}

/** Weekend party start times (Bucharest wall clock). */
export const WEEKEND_START_TIMES = ["10:00", "17:00"] as const;

export function computeAvailableStartTimes(params: {
  pkg: PackageType;
  date: Date;
  reservations: Reservation[];
  openHour: number;
  closeHour: number;
  stepMinutes: number;
}) {
  const { pkg, date, reservations, openHour, closeHour, stepMinutes } = params;

  const durationHrs = packageSchedulingBlockHours(pkg);
  const slots: string[] = [];
  const disabled = new Set<string>();

  const dayFullyBooked = anyReservationTouchesDay(reservations, date);

  const d = bucharestParts(date);
  const durationMs = durationHrs * 60 * 60_000;
  const endMs = Date.UTC(d.year, d.month - 1, d.day, closeHour, 0, 0, 0);

  const startHours = isBucharestWeekend(date)
    ? WEEKEND_START_TIMES.map((t) => Number(t.split(":")[0]))
    : null;

  const hourCandidates =
    startHours ??
    (() => {
      const hours: number[] = [];
      const stepMs = stepMinutes * 60_000;
      const startMs = Date.UTC(d.year, d.month - 1, d.day, openHour, 0, 0, 0);
      for (let tMs = startMs; tMs < endMs; tMs += stepMs) {
        const slotEndMs = tMs + durationMs;
        if (slotEndMs > endMs) break;
        hours.push(new Date(tMs).getUTCHours());
      }
      return hours;
    })();

  for (const hour of hourCandidates) {
    const tMs = Date.UTC(d.year, d.month - 1, d.day, hour, 0, 0, 0);
    const slotEndMs = tMs + durationMs;

    // Weekdays: party + cleaning must finish by close. Weekends allow 17:00 (ends after close).
    if (!startHours && slotEndMs > endMs) continue;

    const label = `${pad2(hour)}:00`;
    slots.push(label);

    if (dayFullyBooked) {
      disabled.add(label);
    }
  }

  return { slots, disabled };
}
