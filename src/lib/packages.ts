export const PACKAGE_TYPES = ["basic", "start", "premium", "vip"] as const;
export type PackageType = (typeof PACKAGE_TYPES)[number];

/** Display order for tier upgrades on the parties page. */
export const PACKAGE_TIER_ORDER: PackageType[] = [...PACKAGE_TYPES];

export function isPackageType(value: string | undefined | null): value is PackageType {
  return PACKAGE_TYPES.includes(value as PackageType);
}

/** Party time shown to guests (e.g. 10:00–13:00). */
export const PARTY_DURATION_HOURS = 3;

/** Cleaning buffer after the party (e.g. hour 14 → 13:00–14:00); not shown to guests. */
export const PARTY_CLEANING_BUFFER_HOURS = 1;

/** Guest-facing party length stored on bookings. */
export function packagePartyDurationHours(_pkg: PackageType): number {
  return PARTY_DURATION_HOURS;
}

/** Room hold on the calendar: party + cleaning buffer (e.g. 10:00–14:00). */
export function packageSchedulingBlockHours(_pkg: PackageType): number {
  return PARTY_DURATION_HOURS + PARTY_CLEANING_BUFFER_HOURS;
}

/** @deprecated Use packagePartyDurationHours or packageSchedulingBlockHours. */
export function packageDurationHours(pkg: PackageType): number {
  return packagePartyDurationHours(pkg);
}

export function packageGuestCount(pkg: PackageType): number {
  switch (pkg) {
    case "basic":
      return 15;
    case "start":
      return 10;
    case "premium":
      return 15;
    case "vip":
      return 20;
  }
}

export function stripePriceEnvKey(pkg: PackageType): string {
  switch (pkg) {
    case "basic":
      return "STRIPE_PRICE_BASIC";
    case "start":
      return "STRIPE_PRICE_START";
    case "premium":
      return "STRIPE_PRICE_PREMIUM";
    case "vip":
      return "STRIPE_PRICE_VIP";
  }
}

export function resolveStripePriceId(pkg: PackageType): string {
  const key = stripePriceEnvKey(pkg);
  const id = process.env[key]?.trim();
  if (!id) {
    throw new Error(`Missing ${key} for package "${pkg}".`);
  }
  return id;
}

/** Highlighted tier on the parties page. */
export const FEATURED_PACKAGE: PackageType = "premium";

/** 10% deposit in RON (fallback when Stripe metadata is unavailable). */
export const PACKAGE_DEPOSIT_LEI: Record<PackageType, number> = {
  basic: 100,
  start: 135,
  premium: 185,
  vip: 260,
};

export function formatDepositForButton(lei: number): string {
  return `${lei}\u00a0RON`;
}
