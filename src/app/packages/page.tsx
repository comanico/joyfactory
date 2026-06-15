import Navbar from "../components/Navbar";
import Link from "next/link";
import PartyPackageCard from "../components/PartyPackageCard";
import PartyExtrasSection from "../components/PartyExtrasSection";
import PartyIncludedInAllSection from "../components/PartyIncludedInAllSection";
import { PARTIES_PAGE_PACKAGES } from "@/lib/packages";
import { getServerT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";
import { mediaUrl } from "@/lib/mediaUrl";
import ProtectedImage from "@/app/components/ProtectedImage";

export async function generateMetadata() {
  return buildPageMetadata({ page: "packages", path: "/packages" });
}

export default async function PackagesPage() {
  const t = await getServerT();
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <header className="relative mb-24 overflow-hidden rounded-xl bg-surface-container-low p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-sm mb-6">
              {t("parties.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter mb-6 leading-tight">
              {t("parties.heroTitleLine1")} <br />
              {t("parties.heroTitleLine2")}
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              {t("parties.heroBody")}
            </p>
            <a
              href="/#booking-form"
              className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-10 py-4 rounded-full font-headline font-bold hover:scale-105 transition-transform shadow-lg"
            >
              {t("parties.heroCta")}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <ProtectedImage
                priority
                className="w-full h-full object-cover"
                alt={t("parties.heroAlt")}
                src={mediaUrl("memories.JPG")}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-fixed rounded-full flex items-center justify-center p-6 text-center animate-bounce shadow-xl">
              <span className="font-headline font-black text-on-secondary-fixed text-lg">
                {t("parties.topRated")}
              </span>
            </div>
          </div>
        </header>

        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
              {t("parties.chooseTitle")}
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              {t("parties.chooseBody")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 w-full items-stretch">
            {PARTIES_PAGE_PACKAGES.map((packageId) => (
              <PartyPackageCard key={packageId} packageId={packageId} />
            ))}
          </div>

          <PartyIncludedInAllSection />
          <PartyExtrasSection />
        </section>
      </main>

      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] font-['Plus_Jakarta_Sans'] leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-16 py-20 w-full">
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-black text-[#63367c]">FunFactory</div>
            <p className="text-[#0e2000] opacity-80 max-w-xs">
              {t("footer.about")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#63367c] uppercase tracking-widest text-sm mb-2">
              {t("footer.explore")}
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/safety"
                className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
              >
                {t("footer.safety")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#63367c] uppercase tracking-widest text-sm mb-2">
              {t("footer.connect")}
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
              >
                {t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>
        <div className="px-16 pb-12 border-t border-primary/10 pt-8 text-center md:text-left">
          <p className="text-[#0e2000] opacity-60 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </>
  );
}
