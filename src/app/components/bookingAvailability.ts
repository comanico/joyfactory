export type PackageType = "basic" | "premium" | "vip";

export type Reservation = {
  start: Date;
  end: Date;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toISODateLocal(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function isSameLocalDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function anyReservationTouchesDay(reservations: Reservation[], day: Date) {
  const startOfDay = new Date(day);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(day);
  endOfDay.setHours(23, 59, 59, 999);

  return reservations.some((r) => r.start <= endOfDay && r.end >= startOfDay);
}

export function computeDisabledDatesForPackage(
  pkg: PackageType,
  reservations: Reservation[],
) {
  if (pkg !== "vip") return [];

  const disabled = new Set<string>();
  for (const r of reservations) {
    // Conservative: for VIP, if any booking touches a calendar day, block that day.
    const cursor = new Date(r.start);
    cursor.setHours(0, 0, 0, 0);

    const end = new Date(r.end);
    end.setHours(0, 0, 0, 0);

    while (cursor <= end) {
      disabled.add(toISODateLocal(cursor));
      cursor.setDate(cursor.getDate() + 1);
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

  const start = new Date(date);
  start.setHours(openHour, 0, 0, 0);
  const end = new Date(date);
  end.setHours(closeHour, 0, 0, 0);

  for (let t = new Date(start); t < end; t = new Date(t.getTime() + stepMinutes * 60_000)) {
    const slotEnd = new Date(t.getTime() + durationHrs * 60 * 60_000);
    if (slotEnd > end) break;

    const hh = pad2(t.getHours());
    const mm = pad2(t.getMinutes());
    const label = `${hh}:${mm}`;
    slots.push(label);

    const overlapsAny = dayReservations.some((r) => overlaps(t, slotEnd, r.start, r.end));
    if (overlapsAny) disabled.add(label);
  }

  return { slots, disabled };
}

