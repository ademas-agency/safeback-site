import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import SuiviAlerte from "./suivi-alerte";

/**
 * Page d'une alerte : `https://safe-back.fr/a/<id>`.
 *
 * C'est le lien porté par le SMS d'alerte, à la place d'un lien Google Maps.
 * Il est reçu par les proches choisis par la personne — souvent sans l'app,
 * dans l'urgence. Quand SafeBack est installée, iOS ouvre le lien dans l'app
 * (voir `/.well-known/apple-app-site-association`) et cette page n'est pas
 * affichée.
 *
 * Tout ce qui compte se passe dans `SuiviAlerte`, côté client : l'alerte est
 * interrogée directement depuis le téléphone, toutes les 15 secondes, tant
 * qu'elle est ouverte. Rien n'est prérendu ni mis en cache : une position
 * figée serait exactement le défaut du lien Maps qu'on remplace.
 *
 * Confidentialité : la page n'affiche que le prénom et une position, et
 * seulement tant que l'alerte est ouverte — la fonction ne renvoie rien de
 * plus une fois l'alerte close. Aucun outil d'analyse, aucun journal.
 */

export const metadata: Metadata = {
  title: "Alerte",
  description: "Quelqu'un a déclenché une alerte SafeBack. Ouvre ce lien pour voir sa position en direct.",
  robots: { index: false, follow: false },
  // Aperçu dans Messages : ni prénom ni position, le lien circule en clair.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "Alerte SafeBack",
    description: "Quelqu'un a besoin d'aide. Ouvre ce lien pour voir sa position en direct.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SafeBack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alerte SafeBack",
    description: "Quelqu'un a besoin d'aide. Ouvre ce lien pour voir sa position en direct.",
    images: ["/og.png"],
  },
};

export default async function AlertePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="relative min-h-screen flex flex-col bg-nuit text-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-blue/25 to-violet/25 blur-[120px]"
      />

      <header className="relative z-10 px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/logo.png" alt="SafeBack" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold">
            Safe<span className="text-lavande">Back</span>
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <SuiviAlerte id={id} />
      </main>

      <footer className="relative z-10 px-6 py-6 text-center text-xs text-white/30">
        <Link href="/cgu" className="hover:text-white/60 transition-colors">
          CGU
        </Link>
        <span className="mx-2">·</span>
        <Link href="/confidentialite" className="hover:text-white/60 transition-colors">
          Confidentialité
        </Link>
      </footer>
    </div>
  );
}
