// app/components/Navbar.tsx
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, type SupportedLang } from "@/i18n/resources";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuId = useId();

  const isActive = (path: string) => pathname === path;

  const setLangCookie = (lang: SupportedLang) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  };

  const onChangeLang = async (lang: SupportedLang) => {
    setLangCookie(lang);
    await i18n.changeLanguage(lang);
    router.refresh();
  };

  const activeLang = useMemo(
    () => (i18n.language || DEFAULT_LANG) as SupportedLang,
    [i18n.language],
  );

  return (
    <nav className="bg-[#efffd9] backdrop-blur-xl bg-opacity-80 w-full sticky top-0 z-50 shadow-sm">
      <div className="px-6 sm:px-8 md:px-12 py-6 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-black text-[#63367c] tracking-tighter font-headline hover:opacity-90 transition-opacity"
          onClick={() => setMobileOpen(false)}
        >
          FunFactory
        </Link>

        <div className="hidden md:flex items-center gap-10 font-headline font-bold tracking-tight">
          <Link href="/" className={`hover:scale-105 transition-transform duration-200 ${isActive('/') ? 'text-[#63367c] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.playZones")}
          </Link>
          <Link href="/packages" className={`hover:scale-105 transition-transform duration-200 ${isActive('/packages') ? 'text-[#63367c] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.packages")}
          </Link>
          <Link href="/cafe" className={`hover:scale-105 transition-transform duration-200 ${isActive('/cafe') ? 'text-[#63367c] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.cafe")}
          </Link>
          <Link href="/safety" className={`hover:scale-105 transition-transform duration-200 ${isActive('/safety') ? 'text-[#63367c] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.safety")}
          </Link>          
          <Link href="/contact" className={`hover:scale-105 transition-transform duration-200 ${isActive('/contact') ? 'text-[#63367c] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.contact")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-3 py-2 border border-outline-variant/30">
            <button
              type="button"
              onClick={() => onChangeLang("ro")}
              className={[
                "px-3 py-1 rounded-full font-headline font-extrabold text-sm transition-colors",
                activeLang === "ro"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => onChangeLang("en")}
              className={[
                "px-3 py-1 rounded-full font-headline font-extrabold text-sm transition-colors",
                activeLang === "en"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-primary",
              ].join(" ")}
            >
              EN
            </button>
          </div>
          <Link
            href="/#booking-form"
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold scale-95 active:scale-95 transition-all hover:scale-105 shadow-md"
          >
            {t("nav.bookNow")}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-white/60 backdrop-blur-md w-12 h-12 text-on-surface-variant hover:text-primary transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls={mobileMenuId}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        id={mobileMenuId}
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-200",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="pt-4 pb-2">
          <div className="flex flex-col gap-2 font-headline font-bold tracking-tight">
            <Link
              href="/"
              className={[
                "rounded-2xl px-4 py-3 transition-colors",
                isActive("/")
                  ? "bg-white/70 text-[#63367c]"
                  : "text-[#0e2000] opacity-80 hover:bg-white/60 hover:opacity-100",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.playZones")}
            </Link>
            <Link
              href="/packages"
              className={[
                "rounded-2xl px-4 py-3 transition-colors",
                isActive("/packages")
                  ? "bg-white/70 text-[#63367c]"
                  : "text-[#0e2000] opacity-80 hover:bg-white/60 hover:opacity-100",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.packages")}
            </Link>
            <Link
              href="/cafe"
              className={[
                "rounded-2xl px-4 py-3 transition-colors",
                isActive("/cafe")
                  ? "bg-white/70 text-[#63367c]"
                  : "text-[#0e2000] opacity-80 hover:bg-white/60 hover:opacity-100",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.cafe")}
            </Link>
            <Link
              href="/safety"
              className={[
                "rounded-2xl px-4 py-3 transition-colors",
                isActive("/safety")
                  ? "bg-white/70 text-[#63367c]"
                  : "text-[#0e2000] opacity-80 hover:bg-white/60 hover:opacity-100",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.safety")}
            </Link>
            <Link
              href="/contact"
              className={[
                "rounded-2xl px-4 py-3 transition-colors",
                isActive("/contact")
                  ? "bg-white/70 text-[#63367c]"
                  : "text-[#0e2000] opacity-80 hover:bg-white/60 hover:opacity-100",
              ].join(" ")}
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            <div className="mt-2 flex items-center justify-between rounded-2xl px-4 py-3 bg-white/40 backdrop-blur-md border border-outline-variant/30">
              <div className="text-sm font-extrabold opacity-80">
                {t("nav.language", { defaultValue: "Language" })}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChangeLang("ro")}
                  className={[
                    "px-3 py-1 rounded-full font-headline font-extrabold text-sm transition-colors",
                    activeLang === "ro"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-primary",
                  ].join(" ")}
                >
                  RO
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLang("en")}
                  className={[
                    "px-3 py-1 rounded-full font-headline font-extrabold text-sm transition-colors",
                    activeLang === "en"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-primary",
                  ].join(" ")}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}