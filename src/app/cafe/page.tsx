// app/cafe/page.tsx
import Navbar from "../components/Navbar";
import CafeMenuSection from "../components/CafeMenuSection";
import { getServerT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";
import { mediaUrl } from "@/lib/mediaUrl";
import ProtectedImage from "@/app/components/ProtectedImage";

export async function generateMetadata() {
  return buildPageMetadata({ page: "cafe", path: "/cafe" });
}

export default async function CafePage() {
  const t = await getServerT();
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        {/* Hero */}
        <header className="relative mb-20 rounded-3xl bg-surface-container-low p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          <div className="flex-1 z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-sm mb-6">
              {t("cafe.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter mb-6 leading-tight">
              {t("cafe.heroTitleLine1")}
              <br />
              {t("cafe.heroTitleLine2")}
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              {t("cafe.heroBody")}
            </p>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <ProtectedImage
                priority
                className="w-full h-full object-cover"
                alt="modern cozy café with large windows overlooking indoor playground, parents relaxing with coffee"
                src={mediaUrl("cafenea.JPG")}
              />
            </div>
          </div>
        </header>

        <CafeMenuSection />
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-16 py-20 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black text-[#63367c] font-headline">
              FunFactory
            </div>
            <p className="text-[#0e2000] opacity-80 font-body leading-relaxed max-w-xs">
              {t("cafe.footerAbout")}
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">
              {t("cafe.quickLinks")}
            </h4>
            <ul className="space-y-3 font-body">
              <li>
                <a
                  href="/"
                  className="text-[#0e2000] opacity-80 hover:underline"
                >
                  {t("nav.playZones")}
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  className="text-[#0e2000] opacity-80 hover:underline"
                >
                  {t("nav.packages")}
                </a>
              </li>
              <li>
                <a
                  href="/cafe"
                  className="text-[#0e2000] opacity-80 hover:underline"
                >
                  {t("nav.cafe")}
                </a>
              </li>
              <li>
                <a
                  href="/safety"
                  className="text-[#0e2000] opacity-80 hover:underline"
                >
                  {t("nav.safety")}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-[#0e2000] opacity-80 hover:underline"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
