// app/page.tsx
import Navbar from "./components/Navbar";
import QuickBooking from "./components/QuickBooking";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; date?: string; time?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      {/* Top Navigation */}

      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 pb-32">
        {/* Hero Header */}
        <header className="mb-20 max-w-3xl">
          <span className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label font-bold text-sm uppercase tracking-widest mb-6 inline-block">
            Explore Our World
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-black text-primary tracking-tighter leading-[0.9] mb-8">
            Zones of <br />
            <span className="text-secondary italic">Pure Joy.</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-medium">
            Designed for sophisticated play. Each zone is a carefully curated
            environment that balances high-energy physical activity with creative
            discovery.
          </p>
        </header>

        {/* Bento Gallery Section */}
        <div className="bento-grid">
          {/* Large Feature Card: Ball Pit */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 opacity-60"></div>
            <img
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              alt="luxury indoor ball pit with thousands of white and pastel purple balls in a modern minimalist playroom setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjLbKIF5iDa8XcC8-5q0Mq8GnXQzAHf_V1F0jCSxuIkVGOJKdJ4OVYj-wosxTtEGZRNUSnRYX_o_xzVMNsrewsgtHQJMLdEp2tf7J71I1IIWnm8hdM5eP0Onbp3enE345vSY4PWtdHhmo00YJLUsQ-2uU0e3DywWgzyGETrOOGLOHbQovxP2XRd-VKtf4mm0Vhnq_ktc2SNimouFGmpo3VQT_X-rvBYF8HXS7TUgXYyU_AwL8Y_y8QBLj6-Bvwzo8ToflQPRDGq5g"
            />
            <div className="absolute bottom-0 left-0 p-12 z-20 w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-surface-bright text-3xl">
                  blur_on
                </span>
                <h3 className="text-4xl font-headline font-extrabold text-white">
                  The Infinity Ball Pit
                </h3>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white/90 text-lg max-w-lg leading-snug">
                  A sea of 50,000 antimicrobial pearls. Dive into a sensory-rich
                  landscape designed for physical buoyancy and tactile delight.
                </p>
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold border border-white/30">
                  Ages 3-12
                </div>
              </div>
            </div>
          </div>

          {/* Side Card: Toddler Corner */}
          <div className="col-span-12 lg:col-span-4 bg-tertiary-container rounded-xl p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">
                child_care
              </span>
              <h3 className="text-4xl font-headline font-black text-on-tertiary-container leading-tight mb-4">
                Toddler <br />
                Sanctuary
              </h3>
              <p className="text-on-tertiary-container/80 text-lg leading-relaxed">
                Soft edges, organic shapes, and gentle sensory panels for our
                smallest explorers.
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-on-tertiary-container font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Fully Padded Surfaces
                </li>
                <li className="flex items-center gap-3 text-on-tertiary-container font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Sensory Wall Panels
                </li>
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-tertiary rounded-full opacity-20 blur-2xl"></div>
          </div>

          {/* Middle Row: Jungle Gym & Climbing Wall */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-highest rounded-xl p-8 flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden h-64 shadow-sm">
              <img
                className="w-full h-full object-cover"
                alt="modern eco-friendly wooden indoor jungle gym with rope bridges and architectural climbing structures"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6NOiBlVuqBy_LpT3C8J-02JKlWph8-uc_hq5YDATjj5p9yyn_VxsOp4RZ7L3CpadB118XddBLhhT0hxlrZyUjvmUgxR2oZJZnQO4UD98ixKR2LIuaW6t1lyqHuhaKjTUyHCtiHgygBjyM8EFVIUzoLmKp8myigfiUjKrOMjt9T378KXHbiqwyONRj0gZ1fa2m_h-28vf7TSmXGEhu764dGxQp-vbEWPIxa5kPdHjyko5-9qpkj9NHblEXvaqNhaTytpKp5EuZiH4"
              />
            </div>
            <div>
              <h3 className="text-2xl font-headline font-extrabold text-primary mb-2">
                Canopy Jungle Gym
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                A multi-level architectural maze of sustainable timber and rope
                bridges.
              </p>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                Agility
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                Nature-Inspired
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-surface-container rounded-xl overflow-hidden group">
            <div className="grid grid-cols-2 h-full">
              <div className="p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-headline font-black text-secondary mb-4 leading-tight">
                  Sky-High <br />
                  Climbing
                </h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Custom-molded geometric holds and auto-belay systems for safe,
                  gravity-defying fun.
                </p>
                <button className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
                  Learn Techniques{" "}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="colorful geometric climbing wall inside a bright modern recreational facility with safety mats"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_s2ve6akmUEw50QT7E2HctUEX9TgsEG1N6aMOF_a9NkfEWnoLMNYFF_GDcCSP4rYY_MVBvd7U4DVfxiYzNPdanMy-_U_liVuj_aqDmMjWf-CZCDOX8rcFj8AXfzhQzHSnwORxT4FkFL4QjrrLbh5MFINRAf3U3k91nZsuJ9Dg9N_Gt2SdTv8DMOj7t4aCZK1f-rgzGPg8Uwdrp2v6akNGfEf1gRWXOyyiBCpvy-T6-IWFdmE4C1LYiZVp8YL0t1hcT0mlzkkQ_t0"
                />
              </div>
            </div>
          </div>

          {/* Creative Zone */}
          <div className="col-span-12 lg:col-span-3 bg-secondary-container rounded-xl p-10 flex flex-col items-center text-center justify-center relative overflow-hidden">
            <span
              className="material-symbols-outlined text-secondary text-6xl mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              palette
            </span>
            <h3 className="text-2xl font-headline font-black text-on-secondary-container mb-2">
              Art Atelier
            </h3>
            <p className="text-on-secondary-container/80 text-sm">
              Where little Picassos find their digital and physical canvas.
            </p>
            <div className="absolute top-0 right-0 p-4">
              <div className="w-12 h-12 bg-on-secondary-container/10 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Safety Banner */}
          <div className="col-span-12 bg-white rounded-full px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-xl text-on-surface">
                  Safety First, Always.
                </h4>
                <p className="text-on-surface-variant">
                  Cleaned hourly with eco-certified sanitizers. Fully supervised
                  by trained &apos;Joy Guides&apos;.
                </p>
              </div>
            </div>
            <button className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
              View Safety Protocol
            </button>
          </div>
        </div>
        <QuickBooking
          initialPackage={sp.package}
          initialDateISO={sp.date}
          initialTime={sp.time}
        />
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#dbffb6] dark:bg-[#0e2000] font-['Plus_Jakarta_Sans'] leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-16 py-20 w-full">
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-black text-[#63367c]">JoyFactory</div>
            <p className="text-[#0e2000] opacity-80 max-w-xs">
              Redefining the indoor playground experience through the lens of
              sophisticated joy and architectural wonder.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#63367c] uppercase tracking-widest text-sm mb-2">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all">
                Privacy Policy
              </a>
              <a href="#" className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all">
                Terms of Service
              </a>
              <a href="#" className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all">
                Safety Rules
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#63367c] uppercase tracking-widest text-sm mb-2">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all">
                Contact Us
              </a>
              <a href="#" className="text-[#0e2000] opacity-80 hover:underline decoration-2 transition-all font-bold text-[#63367c]">
                Join Newsletter
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-10 h-10 rounded-full bg-[#63367c] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-16 pb-12 border-t border-primary/10 pt-8 text-center md:text-left">
          <p className="text-[#0e2000] opacity-60 text-sm">
            © 2026 JoyFactory. All rights reserved. Designed for Sophisticated Joy.
          </p>
        </div>
      </footer>
    </>
  );
}