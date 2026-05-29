import Navbar from "@/app/components/Navbar";
import { getServerLang, getServerT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({ page: "terms", path: "/terms" });
}

export default async function TermsPage() {
  const lang = await getServerLang();
  const t = await getServerT(lang);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-10 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">
            {t("termsPage.title")}
          </h1>
          <p className="text-on-surface-variant mt-3">{t("termsPage.updated")}</p>
          <p className="text-on-surface-variant mt-8 leading-relaxed">
            {t("termsPage.intro")}
          </p>

          <div className="mt-8 rounded-2xl bg-surface-container-low border border-outline-variant/20 p-6 md:p-8">
            <h2 className="text-lg font-headline font-extrabold text-on-surface">
              {t("termsPage.operator.title")}
            </h2>
            <p className="mt-3 font-headline font-bold text-primary">
              {t("termsPage.operator.company")}
            </p>
            <p className="text-on-surface-variant text-sm mt-1">
              {t("termsPage.operator.cuiLabel")} {t("termsPage.operator.cui")}
            </p>
            <p className="text-on-surface-variant mt-4 leading-relaxed">
              {t("termsPage.operator.body")}
            </p>
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-headline font-extrabold text-on-surface">
                {t("termsPage.sections.s1t")}
              </h2>
              <p className="text-on-surface-variant mt-3 leading-relaxed">
                {t("termsPage.sections.s1b")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-headline font-extrabold text-on-surface">
                {t("termsPage.sections.s2t")}
              </h2>
              <p className="text-on-surface-variant mt-3 leading-relaxed">
                {t("termsPage.sections.s2b")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-headline font-extrabold text-on-surface">
                {t("termsPage.sections.s3t")}
              </h2>
              <p className="text-on-surface-variant mt-3 leading-relaxed">
                {t("termsPage.sections.s3b")}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

