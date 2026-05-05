// app/parties/page.tsx
import Navbar from "../components/Navbar";
import Link from "next/link";
import { getServerT } from "@/i18n/server";

export default async function PartiesPage() {
  const t = await getServerT();
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        {/* Hero Section - unchanged */}
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
              <img
                className="w-full h-full object-cover"
                alt={t("parties.heroAlt")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe5fPtJKm5hUVJhOPJJWScxMmJkoeiNOQKsvsKCoSRNn6uOQPAwOduf62KYsEI88k4_pJZhMfeyzkwPjqWQVO80jgH5YIeTktQs9M3Y05rNpdiI8sGZAkbBYx92dgrC7qxO_eWh5H9FOE7lE4b2hNWC4Iwx8AuLeiPoshrJfEkDl1mvViX2SKVRCPnWYYcVQbq9661gkfGHaIAWtwcJscQ7WaZ_QbCFiBwsLxWQX_BZS9kBO6SOlhwdM_50XpZo8yqdKZlDipHkeI"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-fixed rounded-full flex items-center justify-center p-6 text-center animate-bounce shadow-xl">
              <span className="font-headline font-black text-on-secondary-fixed text-lg">
                {t("parties.topRated")}
              </span>
            </div>
          </div>
        </header>

        {/* === EXPANDED PACKAGES SECTION === */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
              {t("parties.chooseTitle")}
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              {t("parties.chooseBody")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ==================== BASIC FUN ==================== */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-all">
              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt={t("parties.packages.basic.alt")}
                  src="https://picsum.photos/id/1015/800/600"
                />
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-1">
                {t("packages.basic")}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$299</span>
                <span className="text-on-surface-variant text-sm">
                  {t("parties.packages.basic.priceMeta")}
                </span>
              </div>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                {t("parties.packages.basic.blurb")}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.basic.f1")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.basic.f2")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.basic.f3")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.basic.f4")}
                </li>
              </ul>

              <Link
                href="/?package=basic#booking-form"
                className="block w-full text-center py-4 rounded-2xl border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors"
              >
                {t("parties.selectBasic")}
              </Link>
            </div>

            {/* ==================== PREMIUM JOY ==================== */}
            <div className="bg-primary text-on-primary p-8 rounded-3xl flex flex-col scale-105 shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-bl-3xl">
                {t("parties.mostPopular")}
              </div>

              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt={t("parties.packages.premium.alt")}
                  src="https://picsum.photos/id/133/800/600"
                />
              </div>

              <h3 className="text-2xl font-headline font-extrabold mb-1">
                {t("packages.premium")}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$499</span>
                <span className="text-primary-fixed-dim text-sm">
                  {t("parties.packages.premium.priceMeta")}
                </span>
              </div>
              <p className="text-primary-fixed-dim mb-6 text-sm leading-relaxed">
                {t("parties.packages.premium.blurb")}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.premium.f1")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.premium.f2")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.premium.f3")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.premium.f4")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  {t("parties.giftBags")}
                </li>
              </ul>

              <Link
                href="/?package=premium#booking-form"
                className="block w-full text-center py-4 rounded-2xl bg-on-primary text-primary font-headline font-bold hover:scale-105 transition-transform"
              >
                {t("parties.packages.premium.select")}
              </Link>
            </div>

            {/* ==================== VIP UTOPIA ==================== */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-all">
              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt={t("parties.packages.vip.alt")}
                  src="https://picsum.photos/id/201/800/600"
                />
              </div>

              <h3 className="text-2xl font-headline font-extrabold mb-1">
                {t("packages.vip")}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$799</span>
                <span className="text-on-surface-variant text-sm">
                  {t("parties.packages.vip.priceMeta")}
                </span>
              </div>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                {t("parties.packages.vip.blurb")}
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f1")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f2")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f3")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f4")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f5")}
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  {t("parties.packages.vip.f6")}
                </li>
              </ul>

              <Link
                href="/?package=vip#booking-form"
                className="block w-full text-center py-4 rounded-2xl border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors"
              >
                {t("parties.packages.vip.select")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#dbffb6] dark:bg-[#0e2000] w-full rounded-t-[3rem] mt-20">
        {/* your existing footer */}
      </footer>
    </>
  );
}
