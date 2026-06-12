// app/contact/page.tsx
import Navbar from "../components/Navbar";
import { getServerT } from "@/i18n/server";
import Link from "next/link";
import ContactMap from "@/app/components/ContactMap";
import ContactForm from "@/app/components/ContactForm";
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
              src={mediaUrl("imagination.JPG")}
            />
          </div>

          {/* Tall Image */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="close up of a child's hands navigating colorful rounded bouldering grips in a safe, soft-textured indoor climbing area"
              src={mediaUrl("climber.JPG")}
            />
          </div>

          {/* Wide Image Top */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="overhead view of a modern ball pit filled with pastel purple and lime green balls, minimalist and high-end playground aesthetic"
              src={mediaUrl("society.JPG")}
            />
          </div>

          {/* Wide Image Bottom */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="a cozy reading nook for kids with soft organic shaped cushions in a high-end educational play space"
              src={mediaUrl("relax.JPG")}
            />
          </div>

          {/* Bottom Row Bento Items */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="group of happy toddlers playing with interactive wall panels that glow with soft light, modern educational toys"
              src={mediaUrl("screen.JPG")}
            />
          </div>

          <div className="md:col-span-3 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <ProtectedImage
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="wide shot of a clean, sophisticated café area for parents overlooking the play zone, soft lighting and premium furniture"
              src={mediaUrl("cloud.JPG")}
            />
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
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer (matches the style from your HTML) */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-16 py-20 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black text-[#63367c] font-headline">
              FunFactory
            </div>
            <p className="text-[#0e2000] opacity-80 font-body leading-relaxed max-w-xs">
              {t("footer.about")}
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">
              {t("footer.explore")}
            </h4>
            <ul className="space-y-3 font-body">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  {t("footer.safety")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full text-center py-8 border-t border-primary/10 mx-auto max-w-screen-xl">
          <p className="text-[#0e2000] opacity-60 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </>
  );
}

