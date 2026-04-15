// app/bookings/page.tsx
import Navbar from "../components/Navbar";

export default function BookingsPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="text-6xl md:text-8xl font-black font-headline text-primary tracking-tighter mb-6 leading-none">
            Pure Joy,<br />
            <span className="text-secondary">Captured.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-medium">
            Step into a world where every corner is a new adventure. Explore the
            JoyFactory experience through our gallery.
          </p>
        </section>

        {/* Bento Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="vibrant indoor playground with soft purple and green climbing structures, sun streaming through large windows, children laughing in the distance"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzaRgJjsJM9D8b0447wVLkctG940uliIFTuKuUlJD7OIctlf2cvRxvR1du4I1T_6wNYU92sM1edwNFTv2UCOgFSccpPkMPRDaGNzv0rjnham2tJm8IOcbLmVPynCTfVPhdCaE2PjL37oDjhk-LaCwzAtsbUG_q3SU5CSnd1RDLvLKZwEpp5KHwFVkILLu40bJlx7PDLBSgbphwzjI6_p587D9BeFWW8NaOK13imUKwDHsgIj_GyU2dafQoaLpWbOO21Xkw22cF2yg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-headline font-bold text-2xl">
                The Cloud Climber
              </span>
            </div>
          </div>

          {/* Tall Image */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="close up of a child's hands navigating colorful rounded bouldering grips in a safe, soft-textured indoor climbing area"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM9SqA_IhwC5ZeNWG2KwtFWc64hlBa_8R3ZF8_cg-Bx3TKaCer2PXl8I-dLuSVvPzdSKpVJ6WaYCDYAf9P4ZMcmzNGuI1m34ucB0sGrSxU8VhGGX-7sESzIzOrRD9UNg4ds4MhoiOYv2lGA95uljxPShvstgTZiG8aqk-J7t3lp6Udw9juQe5to4MOxeR1ir3CUpsPdzkPKiHwZXHe97DvcO_SHMjmo3il3OWgKFglGI0XiNx_kul_2vvh8PUxro9T7zt24CRDsZs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-headline font-bold text-xl">
                Tactile Play
              </span>
            </div>
          </div>

          {/* Wide Image Top */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="overhead view of a modern ball pit filled with pastel purple and lime green balls, minimalist and high-end playground aesthetic"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKkQ_yf8QDm08Y9dIeUcUQNIwvpVF8_LjzAM50xy8_aK2E3QpbN8K9u9bi946oJnDLFVVApFkdMbbkZnGTcGe6DAr6P4aJ0D1wX2O8sGhFe4CzpJtkumWopFChkX85zLmeX05XjB0tmP4WgWtbIEL6hPGMOAwoqRixXH2b49olJmSkGxT6fWdlXsSuX90IcUjPvFbj0WRmchgdXvMylmGvTIlmvybg26HIRp8n05I0kFD5VEWPQXMcDWr2dQHhQNXWeG2c39tY2cc"
            />
          </div>

          {/* Wide Image Bottom */}
          <div className="relative group overflow-hidden rounded-xl bg-surface-container-low">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="a cozy reading nook for kids with soft organic shaped cushions in a high-end educational play space"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChH7oZbi1nTz5rFFEnqxT03BJ8iDK00YChUunpx9ESNeSyl4GWom5bqxKeDEKTuKHi6Z_9-ThExdbu4FS3iqmu9IDvKxdtrrpHG53zL9-BwjmCyr5tTtng1BOZ6iQf8Dz1vh4oMw2lQFa-hT8jxG-qpyf-STDGdu78XqvoMXaW1z4fyg_QIr5ub8EmtV05tsG5ODCx5IdO68JaGd38UIxEatnHnWHcb66REndtwUq2d7BeOP0aru_yaZo-h-V61lJzztUesqGpKn0"
            />
          </div>

          {/* Bottom Row Bento Items */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="group of happy toddlers playing with interactive wall panels that glow with soft light, modern educational toys"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDNV5khDPN4n6b1hUxNbMfph8cYkBBpvB2789DLZRNzhHFkxKKPcmHuhhkfj3SMyg3ZqngBoILAsD3-kk2UOH6vdODZea0aDYI8Ek6yeAZGU1ZJPaRRsv-FUy_ljZqSP9YEcmAeuLfcOvJr4lonj1G9S6VMKEy2i0SZ98FQvWw9S1n1e_0ul3sgz3_JMIVl7xOYHurqLQos48fXZSEk15oOD2y3fqhHKsXbe6y25-db-BO4oURBrxSqlhpZAnEUxuvlv6lE3uvLvw"
            />
          </div>

          <div className="md:col-span-3 relative group overflow-hidden rounded-xl bg-surface-container-low">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="wide shot of a clean, sophisticated café area for parents overlooking the play zone, soft lighting and premium furniture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbq0AybmxlIU8N2u15fMunxj4DU62upsGb4E0hPt2rkjioocfR57jQvWE43ysUdMbjmsWse_KM8MJKHBnHE2oUs83qyVO6hohmGeqcgDveulax7f1hRdNCvgqzkp-7yC_QEQ7L4RNqaofvHmoqUMxdB0sfGeUA4C6Qzu7KbVqlGkMNF9ivh_xcD1BauvLXt_21yHfcg2oBS2ZECL60aZks6jtqlCEvzSU46_LuPxgOqlNy6jydejcip-d_P9ETCKMgc1DGz3pLvdo"
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
                  Let&apos;s Talk <span className="text-secondary">Play.</span>
                </h2>
                <p className="text-lg text-on-surface-variant font-medium">
                  Have questions about our facilities, party packages, or safety
                  protocols? Our team is here to help you plan the perfect visit.
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
                      Visit Us
                    </h4>
                    <p className="text-on-surface-variant">
                      123 Playful Plaza, Creative District
                      <br />
                      Wonderland, NY 10001
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
                      Call Us
                    </h4>
                    <p className="text-on-surface-variant">
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container shadow-sm border-0">
                <img
                  className="w-full h-full object-cover grayscale brightness-110 opacity-80 hover:grayscale-0 transition-all duration-500"
                  alt="stylized map showing the location of JoyFactory play center in a modern urban district"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRLBmjErwLCpBDDYOiwza1zIe_56RP9gUldt6nJ7afUpyNPSQRqUB2nR52SXhyjq7gjpfT4_ztcLrXTqw-zYXsm5LkVm7GmyId7zpljNXRvT5o4rfZCfInlY4gGCeoiRaEqbLKgWEiUOXWk5yDc7bSwJ1iqHsw4iOif2hR250S-C9q6nGVQY6tpdUW36hJIxUreykV-MrIHb5M_lCjhZHnkfHMYn4kw7snfFyBYuj_2aBQgR_MJJbCkjgsjnSHmd4cU_NR3eGtRQU"
                />
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-10 md:p-16 rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                      First Name
                    </label>
                    <input
                      className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                      placeholder="Alex"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                      Last Name
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
                    Email Address
                  </label>
                  <input
                    className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                    placeholder="alex@example.com"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                    Inquiry Type
                  </label>
                  <select className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface appearance-none">
                    <option>General Question</option>
                    <option>Party Booking Inquiry</option>
                    <option>Group Rates</option>
                    <option>Safety &amp; Accessibility</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-headline font-bold text-on-surface-variant px-1">
                    Your Message
                  </label>
                  <textarea
                    className="w-full bg-surface-container-highest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
                    placeholder="How can we help you today?"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (matches the style from your HTML) */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] dark:bg-[#0e2000]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-16 py-20 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black text-[#63367c] font-headline">
              JoyFactory
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
                <a
                  href="#"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Safety Rules
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all"
                >
                  Join Newsletter
                </a>
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
            <div className="flex gap-2">
              <input
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
            © 2026 JoyFactory. All rights reserved. Designed for Sophisticated
            Joy.
          </p>
        </div>
      </footer>
    </>
  );
}