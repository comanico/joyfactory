import type { MetadataRoute } from "next";
import { getSiteBaseUrl, NOINDEX_PATH_PREFIXES } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getSiteBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...NOINDEX_PATH_PREFIXES],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
