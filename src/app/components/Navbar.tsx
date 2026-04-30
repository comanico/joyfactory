// app/components/Navbar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#efffd9] dark:bg-[#0e2000] backdrop-blur-xl bg-opacity-80 w-full sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-12 py-6 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-3xl font-black text-[#63367c] dark:text-[#dbffb6] tracking-tighter font-headline hover:opacity-90 transition-opacity"
        >
          JoyFactory
        </Link>

        <div className="hidden md:flex items-center gap-10 font-headline font-bold tracking-tight">
          <Link href="/" className={`hover:scale-105 transition-transform duration-200 ${isActive('/') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            Play Zones
          </Link>
          <Link href="/parties" className={`hover:scale-105 transition-transform duration-200 ${isActive('/parties') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            Parties
          </Link>
          <Link href="/cafe" className={`hover:scale-105 transition-transform duration-200 ${isActive('/cafe') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            Café
          </Link>
          <Link href="/safety" className={`hover:scale-105 transition-transform duration-200 ${isActive('/safety') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            Safety
          </Link>          
          <Link href="/contact" className={`hover:scale-105 transition-transform duration-200 ${isActive('/contact') ? 'text-[#63367c] dark:text-[#dbffb6] border-b-4 border-[#63367c] pb-1' : 'text-[#0e2000] dark:text-[#efffd9] opacity-70 hover:text-[#63367c]'}`}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold scale-95 active:scale-95 transition-all hover:scale-105 shadow-md">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}