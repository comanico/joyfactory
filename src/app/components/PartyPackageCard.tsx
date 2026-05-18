import Link from "next/link";
import type { PackageType } from "@/lib/packages";
import { FEATURED_PACKAGE } from "@/lib/packages";
import { getServerT } from "@/i18n/server";

export default async function PartyPackageCard({
  packageId,
}: {
  packageId: PackageType;
}) {
  const t = await getServerT();
  const isFeatured = packageId === FEATURED_PACKAGE;
  const baseKey = `parties.packages.${packageId}` as const;
  const features = t(`${baseKey}.features`, {
    returnObjects: true,
  }) as string[];

  const card = (
    <>
      <div className="rounded-2xl overflow-hidden mb-6 h-48 bg-surface-container-low">
        <img
          className="w-full h-full object-cover"
          alt={t(`${baseKey}.alt`)}
          src={`https://picsum.photos/seed/${packageId}/800/600`}
        />
      </div>
      <h3 className="text-2xl font-headline font-extrabold mb-1">
        {t(`packages.${packageId}`)}
      </h3>
      <div className="text-sm font-headline font-bold text-secondary mb-1">
        {t(`${baseKey}.duration`)}
      </div>
      <div className="flex items-baseline gap-2 mb-4 flex-wrap">
        <span
          className={`text-4xl font-black ${isFeatured ? "text-on-primary" : "text-primary"}`}
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
        className={
          isFeatured
            ? "text-primary-fixed-dim mb-6 text-sm leading-relaxed"
            : "text-on-surface-variant mb-6 text-sm leading-relaxed"
        }
      >
        {t(`${baseKey}.blurb`)}
      </p>
      <p
        className={
          isFeatured
            ? "text-sm font-headline font-bold mb-3"
            : "text-sm font-headline font-bold text-primary mb-3"
        }
      >
        {t(`${baseKey}.includesLabel`)}
      </p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature) => (
          <li
            key={feature}
            className={
              isFeatured
                ? "flex items-start gap-3"
                : "flex items-start gap-3 text-on-surface-variant"
            }
          >
            <span
              className={
                isFeatured
                  ? "material-symbols-outlined text-secondary-container text-sm shrink-0 mt-0.5"
                  : "material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5"
              }
            >
              check_circle
            </span>
            <span className="text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/?package=${packageId}#booking-form`}
        className={
          isFeatured
            ? "block w-full text-center py-4 rounded-2xl bg-on-primary text-primary font-headline font-bold hover:scale-105 transition-transform"
            : "block w-full text-center py-4 rounded-2xl border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors"
        }
      >
        {t(`${baseKey}.select`)}
      </Link>
    </>
  );

  if (isFeatured) {
    return (
      <div className="bg-primary text-on-primary p-8 rounded-3xl flex flex-col shadow-2xl relative z-10 overflow-hidden md:scale-[1.02]">
        <div className="absolute top-0 right-0 px-6 py-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-bl-3xl">
          {t("parties.mostPopular")}
        </div>
        {card}
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-all h-full">
      {card}
    </div>
  );
}
