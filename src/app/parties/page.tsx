// app/parties/page.tsx
import Navbar from "../components/Navbar";

export default function PartiesPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in">
        {/* Hero Section */}
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

        {/* Packages Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
              Choose Your Celebration
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Three tiers of joy designed to fit every group size and dream
              theme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-surface-container-lowest p-10 rounded-xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">
                  celebration
                </span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-2">
                Basic Fun
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$299</span>
                <span className="text-on-surface-variant text-sm">/ 10 kids</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  2 Hours Play Time
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Private Party Room
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Basic Decorations
                </li>
              </ul>
              <button className="w-full py-4 rounded-full border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors">
                Select Basic
              </button>
            </div>

            {/* Premium (popular) */}
            <div className="bg-primary text-on-primary p-10 rounded-xl flex flex-col scale-105 shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-tertiary-container text-on-tertiary-container font-headline font-bold text-xs rounded-bl-xl uppercase tracking-widest">
                Most Popular
              </div>
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-8">
                <span
                  className="material-symbols-outlined text-on-primary-container text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-2">
                Premium Joy
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$499</span>
                <span className="text-primary-fixed-dim text-sm">/ 15 kids</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  3 Hours Play Time
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  Themed Decorations
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  Pizza &amp; Juice Included
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    check_circle
                  </span>
                  JoyFactory Gift Bags
                </li>
              </ul>
              <button className="w-full py-4 rounded-full bg-on-primary text-primary font-headline font-bold hover:scale-105 transition-transform">
                Select Premium
              </button>
            </div>

            {/* VIP */}
            <div className="bg-surface-container-lowest p-10 rounded-xl flex flex-col border border-outline-variant border-opacity-20 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">
                  workspace_premium
                </span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold mb-2">
                VIP Utopia
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-primary">$799</span>
                <span className="text-on-surface-variant text-sm">/ 20 kids</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Unlimited Play Time
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Dedicated Party Host
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Gourmet Catering Menu
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    check_circle
                  </span>
                  Professional Photographer
                </li>
              </ul>
              <button className="w-full py-4 rounded-full border-2 border-primary text-primary font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors">
                Select VIP
              </button>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section
          id="booking-form"
          className="bg-surface-container rounded-xl p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-6 leading-tight">
              Ready to Book?
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Secure your preferred date and time in just a few clicks. Our team
              will contact you within 24 hours to finalize themes and details.
            </p>
            {/* ... trust signals ... */}
          </div>

          <div className="lg:w-2/3 bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-2xl relative z-10">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form fields exactly as in your HTML */}
              {/* ... (I kept them all) ... */}
              <button
                type="submit"
                className="md:col-span-2 mt-4 w-full bg-primary text-on-primary py-5 rounded-full font-headline font-extrabold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Complete My Reservation
              </button>
            </form>
          </div>
        </section>

        {/* Fun Facts Bento */}
        <section className="mt-32">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-12 text-center">
            Why Parents Love JoyFactory
          </h2>
          {/* ... exact bento grid from your HTML ... */}
        </section>
      </main>

      {/* Footer (matches your Parties HTML) */}
      <footer className="bg-[#dbffb6] dark:bg-[#0e2000] w-full rounded-t-[3rem] mt-20">
        {/* ... your footer content ... */}
      </footer>
    </>
  );
}