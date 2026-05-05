export const BUCHAREST_TZ = "Europe/Bucharest";

function timeZoneOffsetMinutes(timeZone: string, date: Date) {
  // Returns offset in minutes where positive means tz is ahead of UTC.
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
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

  const year = Number(map.get("year"));
  const month = Number(map.get("month"));
  const day = Number(map.get("day"));
  const hour = Number(map.get("hour"));
  const minute = Number(map.get("minute"));
  const second = Number(map.get("second"));

  const asUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  return (asUtc - date.getTime()) / 60_000;
}

/**
 * Convert a Bucharest "wall time" selection (date + optional HH:MM) into a real JS `Date`
 * representing the correct UTC instant.
 *
 * This avoids interpreting the selection in the server's timezone (which causes shifts).
 */
export function bucharestWallTimeToUtcDate(params: {
  dateISO: string; // YYYY-MM-DD
  timeHHMM?: string | null; // HH:MM, optional for VIP
  fallbackHour?: number;
}) {
  const { dateISO, timeHHMM, fallbackHour = 10 } = params;
  const [yyyy, mm, dd] = dateISO.split("-").map((p) => Number(p));

  const hourMinute = timeHHMM?.split(":").map((p) => Number(p));
  const hh = hourMinute?.[0];
  const min = hourMinute?.[1];

  const hour =
    typeof hh === "number" && Number.isFinite(hh) ? hh : fallbackHour;
  const minute =
    typeof min === "number" && Number.isFinite(min) ? min : 0;

  // First guess: treat wall time as if it were UTC, then shift by the tz offset.
  const guess = new Date(Date.UTC(yyyy, mm - 1, dd, hour, minute, 0, 0));
  const offset = timeZoneOffsetMinutes(BUCHAREST_TZ, guess);
  return new Date(guess.getTime() - offset * 60_000);
}

export function formatBucharestDate(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: BUCHAREST_TZ,
    dateStyle: "full",
  }).format(date);
}

export function formatBucharestTime(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: BUCHAREST_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatBucharestDateTime(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: BUCHAREST_TZ,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

