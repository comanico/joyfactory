export const PACKAGE_TYPES = ["basic", "start", "premium", "vip"] as const;
export type PackageType = (typeof PACKAGE_TYPES)[number];

export function isPackageType(value: string | undefined | null): value is PackageType {
  return PACKAGE_TYPES.includes(value as PackageType);
}

/** Party duration in hours (3h party + 1h bonus). */
export function packageDurationHours(_pkg: PackageType): number {
  return 4;
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
