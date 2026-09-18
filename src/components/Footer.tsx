import Link from "next/link";
import Image from "next/image";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-1.99-4.69h1.99z" />
    </svg>
  );
}

const resourceLinks = [
  { href: "/offres", label: "Offres" },
  { href: "/produit", label: "L'Application" },
  { href: "/statistiques", label: "Statistiques" },
];

const companyLinks = [
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
  { href: "/cgu", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  // Exigé par Google Play : la page de suppression de compte doit être
  // atteignable depuis le site, et son URL est inscrite dans la fiche Play.
  { href: "/suppression-compte", label: "Supprimer mon compte" },
];

const socialLinks = [
  { href: "#", label: "Instagram", name: "safeback", icon: InstagramIcon },
  { href: "#", label: "LinkedIn", name: "safeback", icon: LinkedInIcon },
  { href: "#", label: "TikTok", name: "safeback", icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-nuit border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-3xl mx-auto">
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Suivez-nous</h4>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center gap-2.5 text-white/40 hover:text-white transition-colors duration-200 text-[15px]"
                  >
                    <social.icon />
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-4">Ressources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors duration-200 text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors duration-200 text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-4">Télécharger</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/telecharger" className="text-white/40 hover:text-white transition-colors duration-200 text-[15px]">
                  App Store
                </Link>
              </li>
              <li>
                <Link href="/telecharger" className="text-white/40 hover:text-white transition-colors duration-200 text-[15px]">
                  Google Play
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-3" />

        <div className="flex items-center justify-between pb-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SafeBack"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
              unoptimized
            />
            <span className="text-sm text-white/40">
              <span className="font-bold text-white">Safe<span className="text-lavande">Back</span></span>
              <span className="mx-1.5 text-white/20">|</span>
              Sortez l&apos;esprit léger, veillez sur ceux que vous aimez.
            </span>
          </Link>
          <p className="text-white/30 text-[11px]">
            &copy; 2026 SafeBack. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
