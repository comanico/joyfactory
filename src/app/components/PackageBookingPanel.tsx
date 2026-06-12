"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BOOKABLE_PACKAGES, type PackageType } from "@/lib/packages";

const NO_MENU_FEATURE_MARKER = "__no_menu__";

export function PackageTypeButtons({
  packageType,
  onSelect,
  className = "grid grid-cols-2 gap-2",
}: {
  packageType: PackageType;
  onSelect: (pkg: PackageType) => void;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      {BOOKABLE_PACKAGES.map((pkg) => (
        <button
          key={pkg}
          type="button"
          onClick={() => onSelect(pkg)}
          className={`w-full py-3 px-2 text-xs sm:text-sm font-headline font-bold rounded-3xl transition-all border-2
            ${
              packageType === pkg
                ? "bg-primary text-white shadow-md border-primary"
                : "bg-surface-container-highest border-outline-variant/20 hover:bg-white/60 text-on-surface-variant"
            }`}
        >
          {t(`packages.${pkg}`)}
        </button>
      ))}
    </div>
  );
}

export function PackageDetailsCard({ packageType }: { packageType: PackageType }) {
  const { t } = useTranslation();
  const baseKey = `parties.packages.${packageType}` as const;

  const { title, meta, blurb, features } = useMemo(() => {
    const featureList = t(`${baseKey}.features`, {
      returnObjects: true,
    }) as string[];

    const normalized = (Array.isArray(featureList) ? featureList : []).map((feature) => {
      const isNoMenu = feature === NO_MENU_FEATURE_MARKER;
      return {
        key: isNoMenu ? NO_MENU_FEATURE_MARKER : feature,
        text: isNoMenu ? t("parties.noMenuFeature") : feature,
        negative: isNoMenu,
      };
    });
    return {
      title: t(`packages.${packageType}`),
      meta: `${t(`${baseKey}.price`)} · ${t(`${baseKey}.priceMeta`)}`,
      duration: t(`${baseKey}.duration`),
      blurb: t(`${baseKey}.blurb`),
      features: normalized,
    };
  }, [baseKey, packageType, t]);

  return (
    <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm p-6">
      <div className="text-2xl font-headline font-extrabold text-primary">{title}</div>
      <div className="text-sm font-headline font-bold text-secondary mt-1">{t(`${baseKey}.duration`)}</div>
      <div className="text-on-surface-variant font-medium mt-1">{meta}</div>
      <p className="mt-4 text-on-surface-variant font-medium">{blurb}</p>
      <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto pr-1">
        {features.map((feature) => (
          <li key={feature.key} className="flex gap-2 text-on-surface">
            {feature.negative ? (
              <span
                className="flex h-[20px] w-[20px] shrink-0 mt-0.5 items-center justify-center rounded-full border-2 border-red-600 text-red-600"
                aria-hidden
              >
                <span className="material-symbols-outlined text-[12px] leading-none font-bold">
                  close
                </span>
              </span>
            ) : (
              <span className="material-symbols-outlined text-primary text-[20px] leading-6 shrink-0">
                check_circle
              </span>
            )}
            <span className="font-medium text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimeSlotPicker({
  selectedDate,
  slotInfo,
  selectedTime,
  onSelectTime,
  gridClassName = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 auto-rows-fr",
}: {
  selectedDate: Date | null;
  slotInfo: { slots: string[]; disabled: Set<string> } | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  gridClassName?: string;
}) {
  const { t } = useTranslation();

  if (!selectedDate) {
    return (
      <div className="rounded-3xl bg-surface-container text-on-surface-variant px-6 py-4 text-sm font-medium">
        {t("booking.selectDateToSeeTimes")}
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {(slotInfo?.slots ?? []).map((time) => {
        const isSelected = selectedTime === time;
        const isDisabled = slotInfo?.disabled.has(time) ?? false;
        return (
          <button
            key={time}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectTime(time)}
            className={`w-full h-full min-h-[72px] px-4 py-5 text-lg font-headline font-bold rounded-3xl border-2 transition-all flex items-center justify-center text-center
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed border-outline-variant/30 text-on-surface-variant bg-white/70"
                  : isSelected
                    ? "bg-primary text-white border-primary"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
