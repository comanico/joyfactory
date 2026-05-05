import { DEFAULT_LANG, resources, type SupportedLang } from "@/i18n/resources";

export function packageLabel(params: {
  packageType: string;
  lang?: SupportedLang;
}) {
  const { packageType } = params;
  const lang = params.lang ?? DEFAULT_LANG;
  const pkg = resources[lang]?.translation?.packages as
    | Record<string, string>
    | undefined;
  return pkg?.[packageType] ?? packageType;
}
