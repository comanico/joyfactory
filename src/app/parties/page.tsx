// app/parties/page.tsx
import Navbar from "../components/Navbar";
import PartyPackageCard from "../components/PartyPackageCard";
import { PACKAGE_TYPES } from "@/lib/packages";
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
            {PACKAGE_TYPES.map((packageId) => (
              <PartyPackageCard key={packageId} packageId={packageId} />
            ))}
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
