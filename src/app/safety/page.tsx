// app/safety/page.tsx
import Navbar from "../components/Navbar";
import Link from "next/link";
import { getServerT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";
import ProtectedImage from "@/app/components/ProtectedImage";

export async function generateMetadata() {
  return buildPageMetadata({ page: "safety", path: "/safety" });
}

export default async function SafetyPage() {
  const t = await getServerT();
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-12 pb-24 md:pt-24 md:pb-40 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="md:w-1/2 space-y-8">
              <span className="bg-primary-fixed text-on-primary-fixed-variant px-6 py-2 rounded-full font-headline font-bold tracking-wide uppercase text-sm">
                {t("safetyPage.promise")}
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-[1.1] tracking-tight">
                {t("safetyPage.heroTitle")}
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">
                {t("safetyPage.heroBody")}
              </p>
              <Link
                href="/#booking-form"
                className="inline-flex bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              >
                {t("safetyPage.heroCta")}
              </Link>
            </div>

            <div className="md:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-surface-container-high rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2">
                <ProtectedImage
                  className="w-full h-[500px] object-cover"
                  alt={t("safetyPage.heroAlt")}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh54UsFEz56C_-6UI976mwjHah57YfgGTKI8M5fc9YBw_9dKTWKkJW4IeU5G0YSxLVX950aN0--33bWfXr-l8CtdKb-WIYchuD_PaR90XE5AVlLfHw0jM0CW9bQ7EpaA38oHGrHpw5Uc1YynHm7EFA6okyi8O68IDj9Q_Fp4iEDZUeGt0-T8N-V7rKDRxuLXnoxKfJ4ik1nOcr210WtMiLsOQTYvlsUGWCJT-s5LpNLFIFm4jY4EvfRgCmJxFVLw9YV90FkbrWuSU"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-lg shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{t("safetyPage.certifiedSafe")}</p>
                    <p className="text-sm opacity-80">{t("safetyPage.dailyInspections")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2 -z-20"></div>
        </section>

        {/* Safety FAQ */}
        <section id="safety-faq" className="px-6 py-24 bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-headline font-extrabold text-primary text-center mb-16">
              {t("safetyPage.faqTitle")}
            </h2>
            <div className="space-y-4">
              <details className="group bg-surface rounded-xl shadow-sm">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    {t("safetyPage.faqQ1")}
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  {t("safetyPage.faqA1")}
                </div>
              </details>

              <details className="group bg-surface rounded-xl shadow-sm">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    {t("safetyPage.faqQ2")}
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  {t("safetyPage.faqA2")}
                </div>
              </details>

              <details className="group bg-surface rounded-xl shadow-sm">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    {t("safetyPage.faqQ3")}
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  {t("safetyPage.faqA3")}
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto glass-card rounded-xl border border-white/40 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 relative z-10">
              {t("safetyPage.ctaTitle")}
            </h2>
            <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto relative z-10">
              {t("safetyPage.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link
                href="/#booking-form"
                className="bg-primary text-on-primary px-12 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-lg text-center"
              >
                {t("safetyPage.ctaBook")}
              </Link>
              <Link
                href="/contact"
                className="bg-secondary text-white px-12 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-lg text-center"
              >
                {t("safetyPage.ctaContact")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-12 bg-[#63367c] dark:bg-[#1a0029] shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="text-xl font-bold text-white mb-2">FunFactory</div>
            <p className="text-[#efffd9]/80 font-['Be_Vietnam_Pro'] text-sm">
              {t("safetyPage.footerTagline")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <Link
              href="/contact"
              className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm"
            >
              {t("safetyPage.footerContact")}
            </Link>
            <Link
              href="/privacy"
              className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm"
            >
              {t("safetyPage.footerPrivacy")}
            </Link>
            <Link
              href="/terms"
              className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm"
            >
              {t("safetyPage.footerTerms")}
            </Link>
            <Link
              href="/safety#safety-faq"
              className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm"
            >
              {t("safetyPage.footerFaq")}
            </Link>
          </div>
          <div className="text-[#efffd9]/80 font-['Be_Vietnam_Pro'] text-sm text-center md:text-right">
            {t("safetyPage.footerCopyright")}
          </div>
        </div>
      </footer>
    </>
  );
}
