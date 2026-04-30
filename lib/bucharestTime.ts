export const BUCHAREST_TZ = "Europe/Bucharest";

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

