import { getServerT } from "@/i18n/server";
import LangSwitch from "./LangSwitch";
import { mediaUrl } from "@/lib/mediaUrl";
import ProtectedImage from "@/app/components/ProtectedImage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    page: "underConstruction",
    path: "/under-construction",
    noIndex: true,
  });
}

export default async function UnderConstructionPage() {
  const t = await getServerT();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="px-6 md:px-12 py-6 flex justify-between items-center max-w-screen-2xl mx-auto w-full">
        <span className="text-3xl font-black text-primary tracking-tighter font-headline">
          {t("brand")}
        </span>
        <LangSwitch />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="max-w-2xl w-full text-center space-y-10">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative w-full h-full bg-primary-container/20 rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-6xl">
                construction
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-headline font-bold text-sm uppercase tracking-widest inline-block">
              {t("underConstruction.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-primary tracking-tight leading-tight">
              {t("underConstruction.title")}
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg mx-auto">
              {t("underConstruction.body")}
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <ProtectedImage
              src={mediaUrl("FunFactory Logo SVG.svg")}
              alt={t("brand")}
              className="h-12 w-auto opacity-90"
            />
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 text-center text-sm text-on-surface-variant">
        {t("underConstruction.footer")}
      </footer>
    </div>
  );
}
