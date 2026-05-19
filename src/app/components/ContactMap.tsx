import Link from "next/link";
import { getGoogleMapsEmbedUrl, getGoogleMapsOpenUrl } from "@/lib/siteLocation";
import { getServerT } from "@/i18n/server";

export default async function ContactMap() {
  const t = await getServerT();

  return (
    <div className="space-y-3">
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/20">
        <iframe
          title={t("contactPage.mapAlt")}
          src={getGoogleMapsEmbedUrl()}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-center">
        <Link
          href={getGoogleMapsOpenUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-headline font-bold text-primary hover:underline underline-offset-4"
        >
          {t("contactPage.openInMaps")}
          <span className="material-symbols-outlined text-base">open_in_new</span>
        </Link>
      </p>
    </div>
  );
}
