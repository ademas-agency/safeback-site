"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const navLinks = [
  { href: "/produit", label: "L'Application" },
  { href: "/offres", label: "Offres" },
  { href: "/statistiques", label: "Statistiques" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className={`
          pointer-events-auto relative
          mt-4 mx-4
          flex items-center
          h-14
          rounded-full
          border border-white/[0.08]
          bg-nuit/70 backdrop-blur-2xl
          shadow-[0_0_15px_rgba(47,107,255,0.08),0_0_30px_rgba(124,58,237,0.05),inset_0_0_0_0.5px_rgba(255,255,255,0.06)]
          transition-all duration-500 ease-out
          w-full
          ${scrolled ? "max-w-[60rem] lg:px-3" : "max-w-5xl lg:px-4"}
          px-2
        `}
      >
        <Link href="/" className="hidden lg:flex items-center gap-2 shrink-0 pl-1 w-44">
          <div className="w-11 h-11 -my-1 relative overflow-hidden shrink-0">
            <Image
              src="/logo.png"
              alt="SafeBack"
              width={44}
              height={44}
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
              unoptimized
            />
          </div>
          <span className={`font-bold text-white transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}>
            Safe<span className="text-lavande">Back</span>
          </span>
        </Link>

        <Link href="/" className="lg:hidden flex items-center gap-2 shrink-0 pl-1">
          <div className="w-11 h-11 -my-1 relative overflow-hidden shrink-0">
            <Image
              src="/logo.png"
              alt="SafeBack"
              width={44}
              height={44}
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
              unoptimized
            />
          </div>
          <span className="text-base font-bold text-white">
            Safe<span className="text-lavande">Back</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center justify-center flex-1 min-w-0">
          <div className={`flex items-center transition-all duration-500 ${scrolled ? "gap-0" : "gap-0.5"}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1.5 text-white/60 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.06] whitespace-nowrap ${scrolled ? "px-3 text-base" : "px-4 text-[17px]"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex shrink-0 w-44 justify-end">
          <ShinyButton href="/telecharger">
            Télécharger l&apos;app
          </ShinyButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden ml-auto p-2 mr-1 text-white/70 hover:text-white transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="pointer-events-auto fixed inset-x-0 top-[4.5rem] mx-4 rounded-2xl bg-nuit/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_20px_rgba(47,107,255,0.1)] lg:hidden">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3" onClick={() => setOpen(false)}>
              <ShinyButton href="/telecharger" className="w-full">
                Télécharger l&apos;app
              </ShinyButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
