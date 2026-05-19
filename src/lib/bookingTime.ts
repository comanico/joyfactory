import {
  PARTY_CLEANING_BUFFER_HOURS,
  PARTY_DURATION_HOURS,
  packageSchedulingBlockHours,
  type PackageType,
} from "@/lib/packages";

/**
 * Older bookings stored 4 in `durationHours` (party + marketing bonus hour).
 */
export function partyDurationFromStored(storedDurationHours: number): number {
  if (storedDurationHours >= 4) return PARTY_DURATION_HOURS;
  return storedDurationHours;
}

/** Guest-facing end (e.g. 10:00–13:00). */
export function partyEndTime(startTime: Date, storedDurationHours: number): Date {
  const partyHours = partyDurationFromStored(storedDurationHours);
  return new Date(startTime.getTime() + partyHours * 60 * 60_000);
}

/** Room hold end: party + hour-14 buffer (e.g. 10:00–14:00); not shown to guests. */
export function schedulingEndTime(
  startTime: Date,
  storedDurationHours: number,
): Date {
  const partyHours = partyDurationFromStored(storedDurationHours);
  return new Date(
    startTime.getTime() +
      (partyHours + PARTY_CLEANING_BUFFER_HOURS) * 60 * 60_000,
  );
}

export function schedulingBlockHoursForPackage(pkg: PackageType): number {
  return packageSchedulingBlockHours(pkg);
}
