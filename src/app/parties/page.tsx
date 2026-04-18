// app/parties/page.tsx
import Navbar from "../components/Navbar";

export default function PartiesPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        {/* Hero Section - unchanged */}
        <header className="relative mb-24 overflow-hidden rounded-xl bg-surface-container-low p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-sm mb-6">
              Celebrate with Us
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter mb-6 leading-tight">
              Magical Parties, <br />Zero Stress.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              From neon disco bashes to cozy toddler tea parties, we handle the
              mess while you make the memories.
            </p>
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-10 py-4 rounded-full font-headline font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Start Your Adventure
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full h-full object-cover"
                alt="vibrant children's birthday party room with colorful balloons, streamers, and a decorated table in a modern indoor playground"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe5fPtJKm5hUVJhOPJJWScxMmJkoeiNOQKsvsKCoSRNn6uOQPAwOduf62KYsEI88k4_pJZhMfeyzkwPjqWQVO80jgH5YIeTktQs9M3Y05rNpdiI8sGZAkbBYx92dgrC7qxO_eWh5H9FOE7lE4b2hNWC4Iwx8AuLeiPoshrJfEkDl1mvViX2SKVRCPnWYYcVQbq9661gkfGHaIAWtwcJscQ7WaZ_QbCFiBwsLxWQX_BZS9kBO6SOlhwdM_50XpZo8yqdKZlDipHkeI"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-fixed rounded-full flex items-center justify-center p-6 text-center animate-bounce shadow-xl">
              <span className="font-headline font-black text-on-secondary-fixed text-lg">
                Top Rated Venue 2024!
              </span>
            </div>
          </div>
        </header>

        {/* === EXPANDED PACKAGES SECTION === */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
              Choose Your Celebration
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Three tiers of joy designed to fit every group size and dream theme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ==================== BASIC FUN ==================== */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-all">
              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt="Basic Fun party setup"
                  src="https://picsum.photos/id/1015/800/600"
                />
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-1">Basic Fun</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$299</span>
                <span className="text-on-surface-variant text-sm">/ up to 10 kids • 2 hours</span>
              </div>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                Perfect for small, simple celebrations with all the essentials.
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  2 hours of play time
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Private party room
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  Basic balloon &amp; streamer decor
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                  10 kids included
                </li>
              </ul>

              <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors">
                Select Basic Fun
              </button>
            </div>

            {/* ==================== PREMIUM JOY ==================== */}
            <div className="bg-primary text-on-primary p-8 rounded-3xl flex flex-col scale-105 shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-bl-3xl">
                MOST POPULAR
              </div>

              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt="Premium Joy party"
                  src="https://picsum.photos/id/133/800/600"
                />
              </div>

              <h3 className="text-2xl font-headline font-extrabold mb-1">Premium Joy</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$499</span>
                <span className="text-primary-fixed-dim text-sm">/ up to 15 kids • 3 hours</span>
              </div>
              <p className="text-primary-fixed-dim mb-6 text-sm leading-relaxed">
                The perfect balance of fun and convenience — our most chosen package.
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-sm">check_circle</span>3 hours of play time</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-sm">check_circle</span>Fully themed decorations</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-sm">check_circle</span>Pizza, juice &amp; snacks</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-sm">check_circle</span>15 kids included</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-container text-sm">check_circle</span>JoyFactory gift bags for every child</li>
              </ul>

              <button className="w-full py-4 rounded-2xl bg-on-primary text-primary font-headline font-bold hover:scale-105 transition-transform">
                Select Premium Joy
              </button>
            </div>

            {/* ==================== VIP UTOPIA ==================== */}
            <div className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-all">
              <div className="rounded-2xl overflow-hidden mb-6 h-48">
                <img
                  className="w-full h-full object-cover"
                  alt="VIP Utopia party"
                  src="https://picsum.photos/id/201/800/600"
                />
              </div>

              <h3 className="text-2xl font-headline font-extrabold mb-1">VIP Utopia</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$799</span>
                <span className="text-on-surface-variant text-sm">/ up to 20 kids • Unlimited</span>
              </div>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                The ultimate luxury experience — go all out for a truly unforgettable day.
              </p>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Unlimited play time</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Dedicated Party Host</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Gourmet catering menu</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Professional photographer</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Custom gift bags + take-home activity kit</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span>Exclusive access to VIP lounge</li>
              </ul>

              <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors">
                Select VIP Utopia
              </button>
            </div>
          </div>
        </section>

        {/* Booking Form & Fun Facts sections remain the same (or you can expand them later) */}
        {/* ... (keep the rest of your file exactly as before) ... */}
      </main>

      {/* Footer */}
      <footer className="bg-[#dbffb6] dark:bg-[#0e2000] w-full rounded-t-[3rem] mt-20">
        {/* your existing footer */}
      </footer>
    </>
  );
}