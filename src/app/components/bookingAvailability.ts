export type PackageType = "basic" | "premium" | "vip";

export type Reservation = {
  start: Date;
  end: Date;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * ISO date in **Bucharest time** (YYYY-MM-DD).
 * We intentionally do not use the browser/server local timezone because bookings
 * are scheduled in Bucharest time regardless of where the viewer is.
 */
export function toISODateLocal(date: Date) {
  const p = bucharestParts(date);
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`;
}

/** ISO date for "today" in Bucharest time (YYYY-MM-DD). */
export function bucharestTodayISO(now: Date = new Date()) {
  return toISODateLocal(now);
}

/** ISO date for "tomorrow" in Bucharest time (YYYY-MM-DD). */
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

/**
 * Map a real instant into a comparable timestamp in "Bucharest wall time".
 * (We treat the Bucharest formatted components as UTC.)
 */
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

export function computeDisabledDatesForPackage(
  pkg: PackageType,
  reservations: Reservation[],
) {
  if (pkg !== "vip") return [];

  const disabled = new Set<string>();
  for (const r of reservations) {
    // Conservative: for VIP, if any booking touches a calendar day, block that day.
    const sp = bucharestParts(r.start);
    const ep = bucharestParts(r.end);

    let cursorMs = Date.UTC(sp.year, sp.month - 1, sp.day, 0, 0, 0, 0);
    const endMs = Date.UTC(ep.year, ep.month - 1, ep.day, 0, 0, 0, 0);

    while (cursorMs <= endMs) {
      disabled.add(toISODateLocal(new Date(cursorMs)));
      cursorMs += 24 * 60 * 60_000;
    }
  }
  return Array.from(disabled);
}

export function packageDurationHours(pkg: PackageType) {
  if (pkg === "basic") return 2;
  if (pkg === "premium") return 4;
  return 10; // VIP uses day-level logic; duration here isn't used for slot checks
}

export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

export function computeAvailableStartTimes(params: {
  pkg: PackageType;
  date: Date;
  reservations: Reservation[];
  openHour: number;
  closeHour: number;
  stepMinutes: number;
}) {
  const { pkg, date, reservations, openHour, closeHour, stepMinutes } = params;

  if (pkg === "vip") return { slots: [], disabled: new Set<string>() };

  const durationHrs = packageDurationHours(pkg);
  const slots: string[] = [];
  const disabled = new Set<string>();

  const dayReservations = reservations.filter((r) => anyReservationTouchesDay([r], date));

  const d = bucharestParts(date);
  // We build the timeline in "Bucharest wall time" (not real UTC instants).
  // This keeps slot labels stable (10:00 means 10:00 Bucharest).
  const startMs = Date.UTC(d.year, d.month - 1, d.day, openHour, 0, 0, 0);
  const endMs = Date.UTC(d.year, d.month - 1, d.day, closeHour, 0, 0, 0);

  const durationMs = durationHrs * 60 * 60_000;
  const stepMs = stepMinutes * 60_000;

  for (let tMs = startMs; tMs < endMs; tMs += stepMs) {
    const slotEndMs = tMs + durationMs;
    if (slotEndMs > endMs) break;

    const t = new Date(tMs);
    // Since `tMs` is a wall-time timestamp (encoded as UTC), read it back via UTC getters.
    const label = `${pad2(t.getUTCHours())}:${pad2(t.getUTCMinutes())}`;
    slots.push(label);

    const overlapsAny = dayReservations.some((r) => {
      const rs = bucharestWallMs(r.start);
      const re = bucharestWallMs(r.end);
      return tMs < re && rs < slotEndMs;
    });
    if (overlapsAny) disabled.add(label);
  }

  return { slots, disabled };
}

