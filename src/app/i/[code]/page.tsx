import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import BoutonInstaller from "@/components/BoutonInstaller";

/**
 * Page d'invitation : `https://safe-back.fr/i/<code>`.
 *
 * Quand l'app est installée et que le système a validé le lien, le téléphone
 * ouvre l'app directement et cette page n'est jamais vue. Elle est donc pour
 * deux cas : la personne n'a pas l'app, ou le système n'a pas ouvert l'app
 * alors qu'elle est là (lien tapé dans la barre d'adresse, validation du
 * domaine pas encore faite sur ce téléphone, build hors magasin). Pour ce
 * second cas, le bouton « J'ai déjà l'app » ouvre l'app par son schéma
 * interne, `safeback://invite/<code>`, que les deux apps comprennent — et
 * qui, lui, n'a besoin d'aucune validation.
 *
 * Quatre lignes et deux boutons. La version précédente expliquait tout, et
 * les retours étaient : « je comprends rien à cette page », « 1000 fois trop
 * de texte ». Ce qui est indispensable, et seulement ça : pourquoi on est là,
 * installer, revenir sur le lien.
 *
 * Confidentialité : le code sert uniquement à construire le lien vers l'app,
 * côté serveur. Il n'est ni affiché, ni journalisé, ni transmis à un tiers.
 * Aucun prénom : la page est publique.
 */

const TITRE_PARTAGE = "Quelqu'un te confie sa sécurité";
const DESCRIPTION_PARTAGE =
  "Une personne t'a choisi comme proche de confiance sur Safe Back. Installe l'app, puis reviens sur ce lien pour accepter.";

export const metadata: Metadata = {
  title: "Invitation",
  description: DESCRIPTION_PARTAGE,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: TITRE_PARTAGE,
    description: DESCRIPTION_PARTAGE,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SafeBack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE_PARTAGE,
    description: DESCRIPTION_PARTAGE,
    images: ["/og.png"],
  },
};

export default async function InvitationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  // Lettres et chiffres seulement : tout le reste est du bruit, et n'a rien à
  // faire dans un lien qu'on va proposer d'ouvrir.
  const codeSur = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const lienApp = codeSur ? `safeback://invite/${codeSur}` : null;

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
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            Quelqu&apos;un te confie <span className="gradient-text">sa sécurité</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Pour accepter, installe Safe Back, puis <strong className="text-white">reviens sur ce lien</strong>.
          </p>

          <BoutonInstaller libelle="Installer l'app" />

          {lienApp && (
            <p className="mt-8 text-white/50 text-sm">
              Tu as déjà l&apos;app ?{" "}
              <a
                href={lienApp}
                className="text-white font-semibold underline underline-offset-4 hover:text-lavande"
              >
                Ouvrir l&apos;invitation dans Safe Back
              </a>
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
