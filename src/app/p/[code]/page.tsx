import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import BoutonInstaller from "@/components/BoutonInstaller";
import ConsignePromo from "@/components/ConsignePromo";
import LienOuvrirAppPromo from "@/components/LienOuvrirAppPromo";
import SortirNavigateurIntegre from "@/components/SortirNavigateurIntegre";

/**
 * Page d'un code promo partenaire : `https://safe-back.fr/p/<CODE>` — le lien
 * que partagent influenceurs et BDE.
 *
 * Avec l'app installée, iOS et Android l'ouvrent directement (AASA `/p/*`,
 * App Links) et l'app garde le code pour le paywall : cette page n'est vue que
 * par qui n'a pas l'app, ou dans un navigateur intégré (Snapchat, Instagram…)
 * qui n'ouvre jamais les apps — d'où `SortirNavigateurIntegre` en tête.
 *
 * Le code est affiché : il n'a rien de personnel (c'est celui du partenaire),
 * et sur iPhone la personne doit pouvoir le taper si le collage échoue.
 */

const TITRE = "Un mois offert sur Safe Back";
const DESCRIPTION = "Safe Back veille sur toi pendant tes trajets. Ton premier mois est offert avec ce code.";

export const metadata: Metadata = {
  title: "Un mois offert",
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SafeBack" }],
  },
  twitter: { card: "summary_large_image", title: TITRE, description: DESCRIPTION, images: ["/og.png"] },
};

export default async function PromoPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  // Même normalisation que l'app et la base : majuscules, lettres, chiffres, tirets.
  const codeSur = decodeURIComponent(code).toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 32);

  return (
    <div className="relative min-h-screen flex flex-col bg-nuit text-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-blue/25 to-violet/25 blur-[120px]"
      />

      <header className="relative z-10 px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/logo.png" alt="SafeBack" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold">
            Safe<span className="text-lavande">Back</span>
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <SortirNavigateurIntegre type="promo" code={codeSur} />

        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            Un mois <span className="gradient-text">offert</span>
          </h1>

          {codeSur && (
            <div className="mb-6">
              <p className="text-white/50 text-sm mb-2">avec le code</p>
              <p className="inline-block font-mono text-3xl font-bold tracking-widest px-6 py-3 rounded-2xl border border-white/20 bg-white/5 select-all">
                {codeSur}
              </p>
            </div>
          )}

          <ConsignePromo />

          <BoutonInstaller libelle="Installer l'app" codePromo={codeSur || undefined} />

          {codeSur && (
            <p className="mt-8 text-white/50 text-sm">
              Tu as déjà l&apos;app ? <LienOuvrirAppPromo code={codeSur} />
            </p>
          )}
        </div>
      </main>

      <footer className="relative z-10 px-6 py-6 text-center text-xs text-white/30">
        <Link href="/cgu" className="hover:text-white/60 transition-colors">CGU</Link>
        <span className="mx-2">·</span>
        <Link href="/confidentialite" className="hover:text-white/60 transition-colors">Confidentialité</Link>
      </footer>
    </div>
  );
}
