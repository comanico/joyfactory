import type Stripe from "stripe";
import {
  BOOKABLE_PACKAGES,
  resolveStripePriceId,
  type PackageType,
} from "@/lib/packages";

/** Expected `package_key` on each Stripe Product (for validation only). */
export const STRIPE_PACKAGE_KEYS: Record<PackageType, string> = {
  basic: "fun_package_1",
  start: "fun_package_2",
};

export type PackageDepositQuote = {
  packageType: PackageType;
  stripePackageKey: string;
  name: string;
  fullPriceLei: number;
  /** 10% of full_price (display / metadata). */
  depositLei: number;
  /** Amount charged by Stripe Price (minor units, bani). */
  depositAmountMinor: number;
  fullAmountMinor: number;
};

function parseLei(value: string | undefined): number {
  if (!value?.trim()) return 0;
  const n = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function productMetadata(
  product: string | Stripe.Product | Stripe.DeletedProduct | null | undefined,
): Stripe.Metadata {
  if (!product || typeof product === "string") return {};
  if ("deleted" in product && product.deleted) return {};
  return product.metadata ?? {};
}

export function formatDepositAmount(lei: number, locale: string): string {
  const lang = locale.startsWith("en") ? "en-RO" : "ro-RO";
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "RON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(lei);
}

export function quoteFromStripePrice(
  packageType: PackageType,
  price: Stripe.Price,
): PackageDepositQuote {
  const meta = productMetadata(
    typeof price.product === "object" ? price.product : undefined,
  );

  const expectedKey = STRIPE_PACKAGE_KEYS[packageType];
  const stripePackageKey = meta.package_key?.trim() || expectedKey;

  const fullPriceLei = parseLei(meta.full_price);
  const depositLei =
    fullPriceLei > 0 ? Math.round(fullPriceLei * 0.1) : Math.round((price.unit_amount ?? 0) / 100);

  const depositAmountMinor = price.unit_amount ?? Math.round(depositLei * 100);
  const fullAmountMinor =
    fullPriceLei > 0 ? Math.round(fullPriceLei * 100) : depositAmountMinor * 10;

  return {
    packageType,
    stripePackageKey,
    name: meta.name?.trim() || expectedKey,
    fullPriceLei,
    depositLei,
    depositAmountMinor,
    fullAmountMinor,
  };
}

export async function fetchPackageDepositQuote(
  stripe: Stripe,
  packageType: PackageType,
): Promise<PackageDepositQuote> {
  const priceId = resolveStripePriceId(packageType);
  const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
  return quoteFromStripePrice(packageType, price);
}

export async function fetchAllPackageDepositQuotes(
  stripe: Stripe,
): Promise<Record<PackageType, PackageDepositQuote>> {
  const entries = await Promise.all(
    BOOKABLE_PACKAGES.map(async (pkg) => {
      const quote = await fetchPackageDepositQuote(stripe, pkg);
      return [pkg, quote] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<PackageType, PackageDepositQuote>;
}
