"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, type SupportedLang } from "@/i18n/resources";

export default function LangSwitch() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const activeLang = (i18n.language || DEFAULT_LANG) as SupportedLang;

  const onChangeLang = async (lang: SupportedLang) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
    await i18n.changeLanguage(lang);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-3 py-2 border border-outline-variant/30">
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
  );
}
