import type { Metadata } from "next";
import { BRAND, type SupportedLang } from "@/i18n/resources";
import { getServerLang, getServerT } from "@/i18n/server";
import { resolvedSiteUrl } from "@/lib/siteUrl";

const OG_IMAGE_PATH = "/FunFactory%20Logo%20SVG.svg";

export type SeoPageKey =
  | "home"
  | "packages"
  | "cafe"
  | "safety"
  | "contact"
  | "privacy"
  | "terms"
  | "underConstruction";

export async function getSiteBaseUrl(): Promise<string> {
  return resolvedSiteUrl();
}

export async function buildPageMetadata(options: {
  page: SeoPageKey;
  path: string;
  lang?: SupportedLang;
  noIndex?: boolean;
}): Promise<Metadata> {
  const lang = options.lang ?? (await getServerLang());
  const t = await getServerT(lang);
  const base = await getSiteBaseUrl();
  const canonicalPath = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const url = `${base}${canonicalPath === "/" ? "" : canonicalPath}`;
  const pageBase = `seo.pages.${options.page}` as const;

  const title = t(`${pageBase}.title`);
  const description = t(`${pageBase}.description`);
  const keywordsRaw = t("seo.keywords", { defaultValue: "" });
  const keywords = keywordsRaw
    ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  const ogLocale = lang === "ro" ? "ro_RO" : "en_US";
  const ogLocaleAlternate = lang === "ro" ? ["en_US"] : ["ro_RO"];

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      url,
      siteName: t("seo.siteName", { defaultValue: BRAND }),
      title,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          alt: t("seo.ogImageAlt", { defaultValue: BRAND }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

export async function getRootMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  const t = await getServerT(lang);
  const base = await getSiteBaseUrl();

  const defaultTitle = t("seo.defaultTitle");
  const defaultDescription = t("seo.defaultDescription");
  const siteName = t("seo.siteName", { defaultValue: BRAND });
  const keywordsRaw = t("seo.keywords", { defaultValue: "" });
  const keywords = keywordsRaw
    ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    metadataBase: new URL(base),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords,
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: lang === "ro" ? "ro_RO" : "en_US",
      alternateLocale: lang === "ro" ? ["en_US"] : ["ro_RO"],
      url: base,
      siteName,
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: OG_IMAGE_PATH,
          alt: t("seo.ogImageAlt", { defaultValue: BRAND }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [OG_IMAGE_PATH],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: OG_IMAGE_PATH, type: "image/svg+xml" }],
    },
  };
}

/** Paths included in sitemap.xml */
export const PUBLIC_SITEMAP_PATHS = [
  "/",
  "/packages",
  "/cafe",
  "/safety",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const NOINDEX_PATH_PREFIXES = [
  "/admin",
  "/sign-in",
  "/reservation/",
  "/success",
  "/bookings",
  "/api/",
] as const;
