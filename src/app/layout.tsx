// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"
import "vanilla-calendar-pro/styles/index.css";
import "./globals.css";
import GdprConsent from "./components/GdprConsent";
import ImageProtection from "./components/ImageProtection";
import { I18nProvider } from "@/i18n/client";
import { getServerLang } from "@/i18n/server";
import { getRootMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getRootMetadata();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getServerLang();
  return (
    <html lang={lang} className="light">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/FunFactory%20Logo%20SVG.svg"
        />
        {/* Google Fonts + Material Symbols (unchanged) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&amp;family=Be+Vietnam+Pro:ital,wght@0,100..900;1,100..900&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
        <ClerkProvider signInUrl="/sign-in" signInFallbackRedirectUrl="/admin" afterSignOutUrl="/">
          <I18nProvider initialLang={lang}>{children}</I18nProvider>
          <ImageProtection />
          <GdprConsent />
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}