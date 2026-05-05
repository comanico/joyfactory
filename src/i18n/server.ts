import i18next from "i18next";
import { cookies } from "next/headers";
import { DEFAULT_LANG, resources, SUPPORTED_LANGS, type SupportedLang } from "./resources";

type I18nResource = Parameters<typeof i18next.init>[0]["resources"];

function coerceLang(value: string | undefined | null): SupportedLang {
  if (!value) return DEFAULT_LANG;
  return (SUPPORTED_LANGS as readonly string[]).includes(value) ? (value as SupportedLang) : DEFAULT_LANG;
}

export async function getServerLang(): Promise<SupportedLang> {
  const c = await cookies();
  return coerceLang(c.get("lang")?.value);
}

export async function getServerT(lang?: SupportedLang) {
  const lng = lang ?? (await getServerLang());
  const instance = i18next.createInstance();
  await instance.init({
    lng,
    fallbackLng: DEFAULT_LANG,
    resources: resources as unknown as I18nResource,
    interpolation: { escapeValue: false },
  });
  return instance.t.bind(instance);
}

