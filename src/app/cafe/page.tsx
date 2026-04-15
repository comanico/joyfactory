// app/cafe/page.tsx
import Navbar from "../components/Navbar";

export default function CafePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        {/* Hero */}
        <header className="relative mb-20 rounded-3xl bg-surface-container-low p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          <div className="flex-1 z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-sm mb-6">
              Parent Oasis
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter mb-6 leading-tight">
              The Cozy Café,<br/>Where Parents Breathe.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Premium coffee, fresh pastries, and a perfect view of the play zones. 
              Relax while your kids explore — we&apos;ve got the perfect cup waiting.
            </p>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                alt="modern cozy café with large windows overlooking indoor playground, parents relaxing with coffee"
                src="https://picsum.photos/id/1015/1200/800"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-xl flex items-center gap-4">
              <span className="material-symbols-outlined text-4xl text-secondary">local_cafe</span>
              <div>
                <p className="font-headline font-bold text-xl">Freshly Roasted Daily</p>
                <p className="text-on-surface-variant text-sm">Organic • Local • Kid-friendly options</p>
              </div>
            </div>
          </div>
        </header>

        {/* Menu Grid */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface">Today&apos;s Menu</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coffee & Drinks */}
            <div className="bg-surface-container-lowest rounded-3xl p-8">
              <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">local_cafe</span> Coffee &amp; Drinks
              </h3>
              <ul className="space-y-6">
                <li className="flex justify-between"><span>Flat White</span><span className="font-medium">$5.50</span></li>
                <li className="flex justify-between"><span>Matcha Latte</span><span className="font-medium">$6.00</span></li>
                <li className="flex justify-between"><span>Golden Turmeric Milk</span><span className="font-medium">$5.75</span></li>
                <li className="flex justify-between"><span>Strawberry Lemonade (Kids)</span><span className="font-medium">$4.25</span></li>
              </ul>
            </div>

            {/* Pastries */}
            <div className="bg-surface-container-lowest rounded-3xl p-8">
              <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">bakery_dining</span> Fresh Pastries
              </h3>
              <ul className="space-y-6">
                <li className="flex justify-between"><span>Almond Croissant</span><span className="font-medium">$4.95</span></li>
                <li className="flex justify-between"><span>Banana Chocolate Chip Muffin</span><span className="font-medium">$4.50</span></li>
                <li className="flex justify-between"><span>Blueberry Lemon Loaf</span><span className="font-medium">$5.25</span></li>
              </ul>
            </div>

            {/* Kid-Friendly */}
            <div className="bg-primary text-on-primary rounded-3xl p-8">
              <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">child_care</span> Little Bites
              </h3>
              <ul className="space-y-6">
                <li className="flex justify-between"><span>Fruit Cup + Yogurt</span><span className="font-medium">$6.50</span></li>
                <li className="flex justify-between"><span>PB&amp;J Mini Sandwich</span><span className="font-medium">$5.95</span></li>
                <li className="flex justify-between"><span>Cheese Quesadilla</span><span className="font-medium">$5.75</span></li>
              </ul>
              <p className="text-xs mt-8 opacity-75">All kid items come with a free smiley-face cookie 🍪</p>
            </div>
          </div>
        </section>

        {/* Why Our Café */}
        <section className="bg-surface-container rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl font-headline font-extrabold mb-8">Why Parents Love Our Café</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">visibility</span>
              <p className="font-medium">Full view of all play zones</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">eco</span>
              <p className="font-medium">Organic &amp; locally sourced</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">schedule</span>
              <p className="font-medium">Open 9am – 6pm daily</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] dark:bg-[#0e2000]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-16 py-20 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black text-[#63367c] font-headline">JoyFactory</div>
            <p className="text-[#0e2000] opacity-80 font-body leading-relaxed max-w-xs">
              Curating elevated play experiences for the next generation of explorers.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">Quick Links</h4>
            <ul className="space-y-3 font-body">
              <li><a href="#" className="text-[#0e2000] opacity-80 hover:underline">Play Zones</a></li>
              <li><a href="/parties" className="text-[#0e2000] opacity-80 hover:underline">Parties</a></li>
              <li><a href="/cafe" className="text-[#0e2000] opacity-80 hover:underline">Café</a></li>
              <li><a href="#" className="text-[#0e2000] opacity-80 hover:underline">Safety</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-[#63367c] font-headline text-lg">Stay in the Loop</h4>
            <div className="flex gap-2">
              <input className="bg-surface-container-lowest border-0 rounded-full px-6 py-3 w-full" placeholder="Email Address" type="text"/>
              <button className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}