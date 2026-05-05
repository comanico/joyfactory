// app/components/Navbar.tsx
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, type SupportedLang } from "@/i18n/resources";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const setLangCookie = (lang: SupportedLang) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  };

  const onChangeLang = async (lang: SupportedLang) => {
    setLangCookie(lang);
    await i18n.changeLanguage(lang);
    router.refresh();
  };

  return (
    <nav className="bg-[#efffd9] dark:bg-[#0e2000] backdrop-blur-xl bg-opacity-80 w-full sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-12 py-6 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-3xl font-black text-[#63367c] dark:text-[#dbffb6] tracking-tighter font-headline hover:opacity-90 transition-opacity"
        >
          FunFactory
        </Link>

        <div className="hidden md:flex items-center gap-10 font-headline font-bold tracking-tight">
          <Link href="/" className={`hover:scale-105 transition-transform duration-200 ${isActive('/') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.playZones")}
          </Link>
          <Link href="/parties" className={`hover:scale-105 transition-transform duration-200 ${isActive('/parties') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.parties")}
          </Link>
          <Link href="/cafe" className={`hover:scale-105 transition-transform duration-200 ${isActive('/cafe') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.cafe")}
          </Link>
          <Link href="/safety" className={`hover:scale-105 transition-transform duration-200 ${isActive('/safety') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            {t("nav.safety")}
          </Link>          
          <Link href="/contact" className={`hover:scale-105 transition-transform duration-200 ${isActive('/contact') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
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
                (i18n.language || DEFAULT_LANG) === "ro"
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
                (i18n.language || DEFAULT_LANG) === "en"
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
        </div>
      </div>
    </nav>
  );
}