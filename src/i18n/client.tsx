"use client";

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useMemo } from "react";
import { DEFAULT_LANG, resources, type SupportedLang } from "./resources";

type I18nResource = Parameters<typeof i18next.init>[0]["resources"];

export function I18nProvider({
  initialLang,
  children,
}: {
  initialLang: SupportedLang;
  children: React.ReactNode;
}) {
  const instance = useMemo(() => {
    const inst = i18next.createInstance();
    inst.use(initReactI18next).init({
      lng: initialLang ?? DEFAULT_LANG,
      fallbackLng: DEFAULT_LANG,
      resources: resources as unknown as I18nResource,
      interpolation: { escapeValue: false },
    });
    return inst;
  }, [initialLang]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}

