// app/contact/page.tsx
import Navbar from "../components/Navbar";
import { getServerT } from "@/i18n/server";
import Link from "next/link";
import FocusNewsletterOnHash from "@/app/components/FocusNewsletterOnHash";
import ContactMap from "@/app/components/ContactMap";
import { buildPageMetadata } from "@/lib/seo";
import { mediaUrl } from "@/lib/mediaUrl";
import ProtectedImage from "@/app/components/ProtectedImage";

export async function generateMetadata() {
  return buildPageMetadata({ page: "contact", path: "/contact" });
}

export default async function ContactPage() {
  const t = await getServerT();
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="text-6xl md:text-8xl font-black font-headline text-primary tracking-tighter mb-6 leading-none">
            {t("contactPage.heroTitle1")}<br />
            <span className="text-secondary">{t("contactPage.heroTitle2")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-medium">
            {t("contactPage.heroBody")}
          </p>
        </section>

        {/* Bento Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="vibrant indoor playground with soft purple and green climbing structures, sun streaming through large windows, children laughing in the distance"
              src={mediaUrl("imagination.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-headline font-bold text-2xl">
                The Cloud Climber
              </span>
            </div>
          </div>

          {/* Tall Image */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="close up of a child's hands navigating colorful rounded bouldering grips in a safe, soft-textured indoor climbing area"
              src={mediaUrl("climber.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-headline font-bold text-xl">
                Tactile Play
              </span>
            </div>
          </div>

          {/* Wide Image Top */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="overhead view of a modern ball pit filled with pastel purple and lime green balls, minimalist and high-end playground aesthetic"
              src={mediaUrl("society.jpg")}
            />
          </div>

          {/* Wide Image Bottom */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="a cozy reading nook for kids with soft organic shaped cushions in a high-end educational play space"
              src={mediaUrl("relax.jpg")}
            />
          </div>

          {/* Bottom Row Bento Items */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="group of happy toddlers playing with interactive wall panels that glow with soft light, modern educational toys"
              src={mediaUrl("screen.jpg")}
            />
          </div>

          <div className="md:col-span-3 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="wide shot of a clean, sophisticated café area for parents overlooking the play zone, soft lighting and premium furniture"
              src={mediaUrl("cloud.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-headline font-bold text-2xl">
                Sophisticated Joy for Everyone
              </span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info & Map */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-black font-headline text-primary tracking-tight">
                  {t("contactPage.talkTitle1")}{" "}
                  <span className="text-secondary">{t("contactPage.talkTitle2")}</span>
                </h2>
                <p className="text-lg text-on-surface-variant font-medium">
                  {t("contactPage.talkBody")}
                </p>
              </div>

              <div className="grid gap-6">
                {/* Location */}
                <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-container-low">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">
                      {t("contactPage.visitUs")}
                    </h4>
                    <p className="text-on-surface-variant">
                      {t("contactPage.visitAddress")}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-container-low">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    call
                  </span>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">
                      {t("contactPage.callUs")}
                    </h4>
                    <p className="text-on-surface-variant">
                      <a
                        href={`tel:${t("contactPage.phoneTel")}`}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {t("contactPage.phoneDisplay")}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <ContactMap />
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-10 md:p-16 rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                      {t("booking.firstName")}
                    </label>
                    <input
                      className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                      placeholder="Alex"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                      {t("booking.lastName")}
                    </label>
                    <input
                      className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                      placeholder="Joyner"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                    {t("booking.email")}
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                    placeholder="alex@example.com"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                    {t("contactPage.inquiryType", "Tip solicitare")}
                  </label>
                  <select className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface appearance-none">
                    <option>{t("contactPage.inquiry.general", "Întrebare generală")}</option>
                    <option>{t("contactPage.inquiry.party", "Solicitare rezervare petrecere")}</option>
                    <option>{t("contactPage.inquiry.group", "Tarife pentru grupuri")}</option>
                    <option>{t("contactPage.inquiry.safety", "Siguranță & accesibilitate")}</option>
                    <option>{t("contactPage.inquiry.feedback", "Feedback")}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                    {t("contactPage.message", "Mesajul tău")}
                  </label>
                  <textarea
                    className="w-full bg-surface-container-highest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                    placeholder={t("contactPage.messagePlaceholder", "Cu ce te putem ajuta?")}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {t("contactPage.send", "Trimite solicitarea")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (matches the style from your HTML) */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] dark:bg-[#0e2000]">
        <FocusNewsletterOnHash />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-16 py-20 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black text-[#63367c] font-headline">
              FunFactory
            </div>
            <p className="text-[#0e2000] opacity-80 font-body leading-relaxed max-w-xs">
              Curating elevated play experiences for the next generation of
              explorers. Where safety meets boundless imagination.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3 font-body">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Safety Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#newsletter"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Join Newsletter
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">
              Stay in the Loop
            </h4>
            <p className="text-[#0e2000] opacity-80 font-body leading-relaxed">
              Get exclusive event invites and play tips delivered to your inbox.
            </p>
            <div id="newsletter" className="flex gap-2">
              <input
                id="newsletter-email"
                className="bg-surface-container-lowest border-0 rounded-full px-6 py-3 w-full"
                placeholder="Email Address"
                type="text"
              />
              <button className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full text-center py-8 border-t border-primary/10 mx-auto max-w-screen-xl">
          <p className="text-[#0e2000] opacity-60 text-sm">
            © 2026 FunFactory. All rights reserved. Designed for Sophisticated
            Joy.
          </p>
        </div>
      </footer>
    </>
  );
}

