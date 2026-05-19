// app/page.tsx
import Navbar from "./components/Navbar";
import Link from "next/link";
import QuickBooking from "./components/QuickBooking";
import { getServerT } from "@/i18n/server";
import FocusNewsletterOnHash from "@/app/components/FocusNewsletterOnHash";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({ page: "home", path: "/" });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; date?: string; time?: string }>;
}) {
  const t = await getServerT();
  const sp = await searchParams;
  return (
    <>
      {/* Top Navigation */}

      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-32">
        {/* Hero Header */}
        <header className="mb-20 max-w-3xl">
          <span className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label font-bold text-sm uppercase tracking-widest mb-6 inline-block">
            {t("home.explore")}
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-black text-primary tracking-tighter leading-[0.9] mb-8">
            {t("home.heroTitleLine1")} <br />
            <span className="text-secondary italic">{t("home.heroTitleEmphasis")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-medium">
            {t("home.heroBody")}
          </p>
        </header>

        {/* Bento Gallery Section */}
        <div className="bento-grid">
          {/* Large Feature Card: Ball Pit */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 opacity-60"></div>
            <img
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              alt="luxury indoor ball pit with thousands of white and pastel purple balls in a modern minimalist playroom setting"
              src="/ball-pit-homepage.JPG"
            />
            <div className="absolute bottom-0 left-0 p-12 z-20 w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-surface-bright text-3xl">
                  blur_on
                </span>
                <h3 className="text-4xl font-headline font-extrabold text-white">
                  {t("home.infinityTitle")}
                </h3>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white/90 text-lg max-w-lg leading-snug">
                  {t("home.infinityBody")}
                </p>
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold border border-white/30">
                  {t("home.ages")}
                </div>
              </div>
            </div>
          </div>

          {/* Side Card: Toddler Corner */}
          <div className="col-span-12 lg:col-span-4 bg-tertiary-container rounded-xl p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">
                child_care
              </span>
              <h3 className="text-4xl font-headline font-black text-on-tertiary-container leading-tight mb-4">
                {t("home.toddlerTitleLine1")} <br />
                {t("home.toddlerTitleLine2")}
              </h3>
              <p className="text-on-tertiary-container/80 text-lg leading-relaxed">
                {t("home.toddlerBody")}
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-on-tertiary-container font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {t("home.toddlerBullet1")}
                </li>
                <li className="flex items-center gap-3 text-on-tertiary-container font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {t("home.toddlerBullet2")}
                </li>
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-tertiary rounded-full opacity-20 blur-2xl"></div>
          </div>

          {/* Middle Row: Zip line & Climbing Wall */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-highest rounded-xl p-8 flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden h-64 shadow-sm">
              <img
                className="w-full h-full object-cover"
                alt={t("home.jungleAlt")}
                src="/jungle.jpg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-headline font-extrabold text-primary mb-2">
                {t("home.jungleTitle")}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t("home.jungleBody")}
              </p>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                {t("home.jungleTag1")}
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                {t("home.jungleTag2")}
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-surface-container rounded-xl overflow-hidden group">
            <div className="grid grid-cols-2 h-full">
              <div className="p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-headline font-black text-secondary mb-4 leading-tight">
                  {t("home.climbTitleLine1")} <br />
                  {t("home.climbTitleLine2")}
                </h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  {t("home.climbBody")}
                </p>
              </div>
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="colorful geometric climbing wall inside a bright modern recreational facility with safety mats"
                  src="/climbing-homepage.JPG"
                />
              </div>
            </div>
          </div>

          {/* Creative Zone */}
          <div className="col-span-12 lg:col-span-3 bg-secondary-container rounded-xl p-10 flex flex-col items-center text-center justify-center relative overflow-hidden">
            <span
              className="material-symbols-outlined text-secondary text-6xl mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              palette
            </span>
            <h3 className="text-2xl font-headline font-black text-on-secondary-container mb-2">
              {t("home.artTitle")}
            </h3>
            <p className="text-on-secondary-container/80 text-sm">
              {t("home.artBody")}
            </p>
            <div className="absolute top-0 right-0 p-4">
              <div className="w-12 h-12 bg-on-secondary-container/10 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Safety Banner */}
          <div className="col-span-12 bg-white rounded-full px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-xl text-on-surface">
                  {t("home.safetyBannerTitle")}
                </h4>
                <p className="text-on-surface-variant">
                  {t("home.safetyBannerBody")}
                </p>
              </div>
            </div>
            <Link
              href="/safety"
              className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
            >
              {t("home.safetyBannerCta")}
            </Link>
          </div>
        </div>
        <QuickBooking
          initialPackage={sp.package}
          initialDateISO={sp.date}
          initialTime={sp.time}
        />
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] dark:bg-[#0e2000] font-['Plus_Jakarta_Sans'] leading-relaxed">
        <FocusNewsletterOnHash />
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
              <Link
                href="#newsletter"
                className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all font-bold text-[#63367c]"
              >
                {t("footer.newsletter")}
              </Link>
            </div>

            <div id="newsletter" className="pt-4">
              <div className="font-bold text-[#63367c] uppercase tracking-widest text-sm mb-2">
                {t("footer.stay")}
              </div>
              <p className="text-[#0e2000] opacity-80 text-sm mb-3">
                {t("footer.stayBody")}
              </p>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  className="bg-surface-container-lowest border-0 rounded-full px-6 py-3 w-full"
                  placeholder={t("footer.emailPlaceholder")}
                  type="email"
                />
                <button className="bg-primary text-on-primary px-5 rounded-full font-bold shrink-0">
                  {t("footer.subscribe")}
                </button>
              </div>
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