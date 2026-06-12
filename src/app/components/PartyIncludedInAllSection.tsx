import { getServerT } from "@/i18n/server";

const INCLUDED_ITEM_ICONS = [
  "door_front",
  "celebration",
  "water_drop",
  "nightlife",
] as const;

function IncludedTile({
  text,
  icon,
  className = "",
}: {
  text: string;
  icon: string;
  className?: string;
}) {
  return (
    <li
      className={[
        "flex gap-4 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest p-5 md:p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary"
        aria-hidden
      >
        <span className="material-symbols-outlined text-[26px]">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-headline font-bold text-on-surface leading-snug">{text}</p>
      </div>
    </li>
  );
}

export default async function PartyIncludedInAllSection() {
  const t = await getServerT();
  const items = t("parties.includedInAll.items", {
    returnObjects: true,
  }) as string[];

  const firstRow = items.slice(0, 3);
  const centeredItem = items[3];

  return (
    <div
      className="mt-20 pt-16 border-t border-outline-variant/30"
      aria-labelledby="party-included-in-all-heading"
    >
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2
          id="party-included-in-all-heading"
          className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight mb-4"
        >
          {t("parties.includedInAll.title")}
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
          {t("parties.includedInAll.intro")}
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {firstRow.map((text, index) => (
          <IncludedTile
            key={text}
            text={text}
            icon={INCLUDED_ITEM_ICONS[index] ?? "check_circle"}
          />
        ))}
        {centeredItem ? (
          <IncludedTile
            key={centeredItem}
            text={centeredItem}
            icon={INCLUDED_ITEM_ICONS[3] ?? "check_circle"}
            className="lg:col-start-2"
          />
        ) : null}
      </ul>
    </div>
  );
}
