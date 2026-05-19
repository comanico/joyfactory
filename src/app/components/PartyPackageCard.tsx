import Link from "next/link";
import type { PackageType } from "@/lib/packages";
import { FEATURED_PACKAGE, PACKAGE_TIER_ORDER } from "@/lib/packages";
import { getServerT } from "@/i18n/server";
import { mediaUrl } from "@/lib/mediaUrl";
import ProtectedImage from "@/app/components/ProtectedImage";

const NO_MENU_FEATURE_MARKER = "__no_menu__";

function isNoMenuFeatureMarker(feature: string) {
  return feature === NO_MENU_FEATURE_MARKER;
}

function resolveFeatureText(
  t: Awaited<ReturnType<typeof getServerT>>,
  feature: string,
): string {
  if (isNoMenuFeatureMarker(feature)) {
    return t("parties.noMenuFeature");
  }
  return feature;
}

function featureList(t: Awaited<ReturnType<typeof getServerT>>, packageId: PackageType) {
  const list = t(`parties.packages.${packageId}.features`, {
    returnObjects: true,
  });
  return Array.isArray(list) ? (list as string[]) : [];
}

function inheritedFeaturesForTier(
  t: Awaited<ReturnType<typeof getServerT>>,
  packageId: PackageType,
): string[] {
  const index = PACKAGE_TIER_ORDER.indexOf(packageId);
  if (index <= 0) return [];

  const items: string[] = [];
  for (let i = 0; i < index; i++) {
    items.push(
      ...featureList(t, PACKAGE_TIER_ORDER[i]).filter(
        (f) => !isNoMenuFeatureMarker(f),
      ),
    );
  }
  return items;
}

function FeatureRow({
  text,
  variant,
  negative = false,
}: {
  text: string;
  variant: "inherited" | "new" | "featured-inherited" | "featured-new";
  negative?: boolean;
}) {
  const styles = {
    inherited: {
      li: "flex items-start gap-2.5 text-on-surface-variant/85",
      text: "text-xs leading-snug",
    },
    new: {
      li: "flex items-start gap-2.5 text-on-surface-variant",
      text: "text-sm leading-relaxed font-medium",
    },
    "featured-inherited": {
      li: "flex items-start gap-2.5 text-primary-fixed-dim/90",
      text: "text-xs leading-snug",
    },
    "featured-new": {
      li: "flex items-start gap-2.5",
      text: "text-sm leading-relaxed font-semibold",
    },
  }[variant];

  const checkIconClass =
    variant === "featured-new" || variant === "featured-inherited"
      ? variant === "featured-new"
        ? "material-symbols-outlined text-secondary-container text-[18px] shrink-0 mt-0.5"
        : "material-symbols-outlined text-secondary-container/90 text-[16px] shrink-0 mt-0.5"
      : variant === "new"
        ? "material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
        : "material-symbols-outlined text-secondary/70 text-[16px] shrink-0 mt-0.5";

  return (
    <li className={styles.li}>
      {negative ? (
        <span
          className="flex h-[18px] w-[18px] shrink-0 mt-0.5 items-center justify-center rounded-full border-2 border-red-600 text-red-600"
          aria-hidden
        >
          <span className="material-symbols-outlined text-[12px] leading-none font-bold">
            close
          </span>
        </span>
      ) : (
        <span className={checkIconClass}>check_circle</span>
      )}
      <span className={styles.text}>{text}</span>
    </li>
  );
}

export default async function PartyPackageCard({
  packageId,
}: {
  packageId: PackageType;
}) {
  const t = await getServerT();
  const isFeatured = packageId === FEATURED_PACKAGE;
  const baseKey = `parties.packages.${packageId}` as const;
  const newFeatures = featureList(t, packageId);
  const inherited = inheritedFeaturesForTier(t, packageId);
  const hasInherited = inherited.length > 0;

  const inheritedVariant = isFeatured ? "featured-inherited" : "inherited";
  const newVariant = isFeatured ? "featured-new" : "new";

  const card = (
    <>
      <div className="rounded-2xl overflow-hidden mb-6 h-40 bg-surface-container-low">
        <ProtectedImage
          className="w-full h-full object-cover"
          alt={t(`${baseKey}.alt`)}
          src={mediaUrl(`${packageId}.JPG`)}
        />
      </div>
      <h3 className="text-xl font-headline font-extrabold mb-2">
        {t(`packages.${packageId}`)}
      </h3>
      <div
        className={`text-xs font-headline font-bold mb-2 ${isFeatured ? "text-secondary-container" : "text-secondary"}`}
      >
        {t(`${baseKey}.duration`)}
      </div>
      <div className="flex items-baseline gap-2 mb-5 flex-wrap">
        <span
          className={`text-3xl font-black ${isFeatured ? "text-on-primary" : "text-primary"}`}
        >
          {t(`${baseKey}.price`)}
        </span>
        <span
          className={
            isFeatured ? "text-primary-fixed-dim text-sm" : "text-on-surface-variant text-sm"
          }
        >
          {t(`${baseKey}.priceMeta`)}
        </span>
      </div>
      <p
        className={`mb-6 text-sm leading-relaxed ${
          isFeatured ? "text-primary-fixed-dim" : "text-on-surface-variant"
        }`}
      >
        {t(`${baseKey}.blurb`)}
      </p>

      <div className="mb-10">
        <p
          className={`text-sm font-headline font-bold mb-4 ${
            isFeatured ? "" : "text-primary"
          }`}
        >
          {t(`${baseKey}.includesLabel`)}
        </p>

        {hasInherited && (
          <div
            className={
              isFeatured
                ? "rounded-xl bg-white/10 border border-white/15 p-4 mb-6"
                : "rounded-xl bg-primary/5 border border-primary/10 p-4 mb-6"
            }
          >
            <p
              className={`text-[11px] font-headline font-extrabold uppercase tracking-wide mb-3 ${
                isFeatured ? "text-secondary-container" : "text-secondary"
              }`}
            >
              {t(`${baseKey}.inheritedFromLabel`)}
            </p>
            <ul className="space-y-2">
              {inherited.map((feature) => (
                <FeatureRow
                  key={`inherited-${feature}`}
                  text={resolveFeatureText(t, feature)}
                  variant={inheritedVariant}
                />
              ))}
            </ul>
          </div>
        )}

        {hasInherited && newFeatures.length > 0 && (
          <p
            className={`text-[11px] font-headline font-extrabold uppercase tracking-wide mb-3 ${
              isFeatured ? "text-primary-fixed-dim" : "text-primary"
            }`}
          >
            {t(`${baseKey}.plusLabel`)}
          </p>
        )}

        <ul className="space-y-2.5">
          {newFeatures.map((feature) => (
            <FeatureRow
              key={feature}
              text={resolveFeatureText(t, feature)}
              variant={newVariant}
              negative={isNoMenuFeatureMarker(feature)}
            />
          ))}
        </ul>
      </div>

      <Link
        href={`/?package=${packageId}#booking-form`}
        className={`mt-2 block w-full text-center py-4 rounded-2xl font-headline font-bold text-sm transition-colors ${
          isFeatured
            ? "bg-on-primary text-primary hover:scale-105"
            : "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary"
        }`}
      >
        {t(`${baseKey}.select`)}
      </Link>
    </>
  );

  if (isFeatured) {
    return (
      <div className="bg-primary text-on-primary p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 md:scale-[1.02]">
        <div className="absolute top-0 right-0 px-5 py-1.5 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-bl-3xl">
          {t("parties.mostPopular")}
        </div>
        {card}
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all">
      {card}
    </div>
  );
}
