import { headers } from "next/headers";

/** Base URL for links in emails and redirects (no trailing slash). */
export async function resolvedSiteUrl(): Promise<string> {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (envUrl) return envUrl;

  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  const h = await headers();
  const host = (h.get("x-forwarded-host") ?? h.get("host") ?? "").trim();
  if (!host) return "http://localhost:3000";

  const proto =
    h.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  return `${proto}://${host}`;
}
