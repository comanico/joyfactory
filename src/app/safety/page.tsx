// app/safety/page.tsx
import Navbar from "../components/Navbar";

export default function SafetyPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-12 pb-24 md:pt-24 md:pb-40 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="md:w-1/2 space-y-8">
              <span className="bg-primary-fixed text-on-primary-fixed-variant px-6 py-2 rounded-full font-headline font-bold tracking-wide uppercase text-sm">
                Our Promise
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-[1.1] tracking-tight">
                Your Child&apos;s Safety is Our #1 Play Rule
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">
                We&apos;ve built a world where imagination runs wild and safety
                stands firm. Explore our rigorous protocols designed for total
                peace of mind.
              </p>
              <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Plan Your Visit
              </button>
            </div>

            <div className="md:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-surface-container-high rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="rounded-xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2">
                <img
                  className="w-full h-[500px] object-cover"
                  alt="Modern high-end children indoor playground with bright soft flooring and clean pastel colored play structures in soft daylight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh54UsFEz56C_-6UI976mwjHah57YfgGTKI8M5fc9YBw_9dKTWKkJW4IeU5G0YSxLVX950aN0--33bWfXr-l8CtdKb-WIYchuD_PaR90XE5AVlLfHw0jM0CW9bQ7EpaA38oHGrHpw5Uc1YynHm7EFA6okyi8O68IDj9Q_Fp4iEDZUeGt0-T8N-V7rKDRxuLXnoxKfJ4ik1nOcr210WtMiLsOQTYvlsUGWCJT-s5LpNLFIFm4jY4EvfRgCmJxFVLw9YV90FkbrWuSU"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-lg shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">Certified Safe</p>
                    <p className="text-sm opacity-80">Daily Inspections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2 -z-20"></div>
        </section>

        {/* Safety Pillars Grid */}
        <section className="px-6 py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary">
                Our Safety Pillars
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Foundational standards that make JoyFactory the gold standard for
                indoor play.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pillar 1 */}
              <div className="bg-surface p-10 rounded-xl hover:shadow-2xl transition-shadow group">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">person_celebrate</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">
                  Trained &apos;Joy Guides&apos;
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Certified staff supervising every zone, ensuring play remains
                  safe and inclusive.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-surface p-10 rounded-xl hover:shadow-2xl transition-shadow group">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">sanitizer</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-secondary mb-3">
                  Hospital-Grade Cleaning
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  We use eco-friendly, medical-grade sanitization on all surfaces
                  every single day.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-surface p-10 rounded-xl hover:shadow-2xl transition-shadow group">
                <div className="w-16 h-16 bg-tertiary-container/20 rounded-full flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">lock_person</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-tertiary mb-3">
                  Secure Entry/Exit
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Single point of entry with digital tracking and strict photo ID
                  check-out policies.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-surface p-10 rounded-xl hover:shadow-2xl transition-shadow group">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">construction</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">
                  Equipment Safety
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  All play structures exceed international safety standards for
                  impact and durability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Certifications */}
        <section className="px-6 py-24 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto bg-primary rounded-xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="p-12 md:p-20 relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 text-white">
                <h2 className="text-4xl font-headline font-bold mb-6">
                  Expertly Certified Care
                </h2>
                <p className="text-lg text-primary-fixed opacity-90 mb-10 leading-relaxed">
                  Every JoyFactory Joy Guide undergoes rigorous screening and
                  training before ever stepping foot in the play zone. We invest
                  in the best because your family deserves nothing less.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-white/20">
                    <span className="material-symbols-outlined text-green-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    First Aid Certified
                  </span>
                  <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-white/20">
                    <span className="material-symbols-outlined text-green-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    CPR Trained
                  </span>
                  <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-white/20">
                    <span className="material-symbols-outlined text-green-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    Background Checked
                  </span>
                </div>
              </div>

              <div className="md:w-1/2 grid grid-cols-2 gap-6">
                <div className="aspect-square rounded-lg overflow-hidden border-4 border-white/20 -rotate-3">
                  <img
                    className="w-full h-full object-cover"
                    alt="Smiling female educator in a colorful uniform giving a high five to a child in a safe play center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwxeiisKIVRmb1Q-gdu0YulycOdMlvEHs4eaxELbwAToT9hLrVpSPjzYAfCEHIQcg9pqPfhH1vr9VvTxW9XsS4ZrTdRaDazRdsKhxrf9jiw_Tjkwzoet7CtTohYd0Jg1do7-VK7QbXBVK4InqHojB3-oVifuD59wQtcfE-E5GBh5NnSS1uEfbWNqRsl5gCisNaaSKqOvKls6h4nrDrGu-Z0kyYEgUbVfcZpwtY4YGpHZ6CDgrykR04oMq3wVnFZJfkh89mouRBM-Q"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border-4 border-white/20 rotate-3 translate-y-8">
                  <img
                    className="w-full h-full object-cover"
                    alt="Professional staff member demonstrating child-friendly first aid kit in a bright playroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1Fg_-_t8E9tXX51sZB15a4Ersc2a-3DbqN9QIQe-gPKVrltZAfahCJxhJjWA7oykEopHdRADNaJ5RaENGs1Kgj-M_GWnQoW2Tz6RDqGzmqUjnGwyujqgoEBkmLCCYSqPBrmY9ogxYqPefAJvbSly1HEiuwWSxAGP-3f4d4wv1tElc4xRVUsUuQ80VyujLWqcnNwpUHxtrI6FWOici17KHxUcaeQfR_k9WWrorCkdv40PM099Y9tlktWYWDlHviN7lZ44mQhLLwr0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Cleaning Schedule */}
        <section className="px-6 py-24 bg-surface-container-low">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-extrabold text-primary">
                Daily Cleaning Rhythm
              </h2>
              <p className="text-on-surface-variant mt-4">
                Transparency in how we keep things sparkling.
              </p>
            </div>

            <div className="space-y-6">
              {/* Pre-open */}
              <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="bg-secondary text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-bold">PRE-OPEN</span>
                  <span className="text-xl font-headline">7:00 AM</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-secondary mb-2">
                    Deep Sanitization
                  </h4>
                  <p className="text-on-surface-variant">
                    Full electrostatic spray of all equipment and high-touch
                    surfaces using non-toxic disinfectants.
                  </p>
                </div>
                <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
              </div>

              {/* Hourly */}
              <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="bg-primary text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-bold">HOURLY</span>
                  <span className="text-xl font-headline">9AM-7PM</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-primary mb-2">
                    Touchpoint Sweep
                  </h4>
                  <p className="text-on-surface-variant">
                    Wiping down railings, door handles, and café tables.
                    Monitoring restroom cleanliness.
                  </p>
                </div>
                <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
              </div>

              {/* Closing */}
              <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="bg-tertiary text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-bold">CLOSING</span>
                  <span className="text-xl font-headline">8:00 PM</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-tertiary mb-2">
                    Zone-Specific Care
                  </h4>
                  <p className="text-on-surface-variant">
                    Intensive cleaning of ball pits, toddler areas, and changing
                    facilities.
                  </p>
                </div>
                <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
              </div>
            </div>
          </div>
        </section>

        {/* Safety FAQ */}
        <section className="px-6 py-24 bg-surface">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-headline font-extrabold text-primary text-center mb-16">
              Safety FAQ
            </h2>
            <div className="space-y-4">
              <details className="group bg-surface-container-highest rounded-lg">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    What is the age limit for the ball pit?
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  Our main ball pit is designed for ages 4-12. For our smaller
                  guests, we have a dedicated Toddler Zone ball pit that is
                  exclusively for children under 3, ensuring a gentler
                  environment.
                </div>
              </details>

              <details className="group bg-surface-container-highest rounded-lg">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    How often is the equipment inspected?
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  Safety is dynamic! Our Joy Guides perform structural
                  walk-throughs every morning. Additionally, we have certified
                  third-party safety engineers perform a full audit of all
                  equipment every quarter.
                </div>
              </details>

              <details className="group bg-surface-container-highest rounded-lg">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-xl font-bold text-primary">
                    Are snacks from home allowed?
                  </span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  To maintain our strict allergy-safe environment, we ask that no
                  outside food be brought into the play areas. Our café offers a
                  range of nut-free, kid-friendly options prepared in a controlled
                  environment.
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
              Still have questions?
            </h2>
            <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto relative z-10">
              Our Safety Officers are always available to walk you through our
              protocols or address specific concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Book a Play Session
              </button>
              <button className="bg-secondary text-white px-12 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Contact Safety Officer
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-12 bg-[#63367c] dark:bg-[#1a0029] shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="text-xl font-bold text-white mb-2">JoyFactory</div>
            <p className="text-[#efffd9]/80 font-['Be_Vietnam_Pro'] text-sm">
              Empowering play through sophisticated safety.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <a href="#" className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm">
              Contact Us
            </a>
            <a href="#" className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-[#efffd9]/80 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm">
              Safety FAQ
            </a>
          </div>
          <div className="text-[#efffd9]/80 font-['Be_Vietnam_Pro'] text-sm text-center md:text-right">
            © 2026 JoyFactory Play Centers. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}