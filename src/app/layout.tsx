// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "sonner"
import "vanilla-calendar-pro/styles/index.css";
import "./globals.css";
import GdprConsent from "./components/GdprConsent";
import { I18nProvider } from "@/i18n/client";
import { getServerLang, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const brand = t("brand");
  return {
    title: `${brand} | Zones of Pure Joy`,
    description: "Sophisticated indoor playground for kids 3-12",
  };
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
        <I18nProvider initialLang={lang}>{children}</I18nProvider>
        <GdprConsent />
        <Toaster />
      </body>
    </html>
  );
}