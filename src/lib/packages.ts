export const PACKAGE_TYPES = ["basic", "start"] as const;
export type PackageType = (typeof PACKAGE_TYPES)[number];

/** Packages shown on the /packages page and homepage booking. */
export const PARTIES_PAGE_PACKAGES = PACKAGE_TYPES;

/** Alias for packages customers can book online. */
export const BOOKABLE_PACKAGES = PACKAGE_TYPES;

export type BookablePackageType = PackageType;

export function isBookablePackage(
  value: string | undefined | null,
): value is BookablePackageType {
  return (BOOKABLE_PACKAGES as readonly string[]).includes(value ?? "");
}

/** Display order for tier upgrades on the packages page. */
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
  }
}

/** Env var names for Stripe Price IDs (new names first, legacy fallbacks). */
export function stripePriceEnvKeys(pkg: PackageType): readonly string[] {
  switch (pkg) {
    case "basic":
      return ["STRIPE_PRICE_PACKAGE_1", "STRIPE_PRICE_BASIC"];
    case "start":
      return ["STRIPE_PRICE_PACKAGE_2", "STRIPE_PRICE_START"];
  }
}

export function resolveStripePriceId(pkg: PackageType): string {
  for (const key of stripePriceEnvKeys(pkg)) {
    const id = process.env[key]?.trim();
    if (id) return id;
  }
  const keys = stripePriceEnvKeys(pkg).join(" or ");
  throw new Error(`Missing ${keys} for package "${pkg}".`);
}

/** Highlighted tier on the packages page. */
export const FEATURED_PACKAGE: PackageType = "start";

/** Deposit in RON (fallback when Stripe metadata is unavailable). */
export const PACKAGE_DEPOSIT_LEI: Record<PackageType, number> = {
  basic: 300,
  start: 135,
};

export function formatDepositForButton(lei: number): string {
  return `${lei}\u00a0RON`;
}
