import Link from "next/link";
import { PARTY_EXTRA_ICONS, PARTY_EXTRA_IDS } from "@/lib/partyExtras";
import { getServerT } from "@/i18n/server";

export default async function PartyExtrasSection() {
  const t = await getServerT();

  return (
    <div className="mt-20 pt-16 border-t border-outline-variant/30" aria-labelledby="party-extras-heading">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2
          id="party-extras-heading"
          className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight mb-4"
        >
          {t("parties.extras.title")}
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
          {t("parties.extras.intro")}
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {PARTY_EXTRA_IDS.map((id) => (
          <li
            key={id}
            className="flex gap-4 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest p-5 md:p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container"
              aria-hidden
            >
              <span className="material-symbols-outlined text-[26px]">
                {PARTY_EXTRA_ICONS[id]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-headline font-bold text-on-surface leading-snug mb-1">
                {t(`parties.extras.items.${id}.name`)}
              </p>
              <p className="text-sm font-headline font-extrabold text-primary">
                {t(`parties.extras.items.${id}.price`)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-center mt-10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-primary font-headline font-bold hover:underline underline-offset-4"
        >
          {t("parties.extras.contactCta")}
          <span className="material-symbols-outlined text-xl">mail</span>
        </Link>
      </p>
    </div>
  );
}
