import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import BoutonInstaller from "@/components/BoutonInstaller";

/**
 * Page d'invitation : `https://safe-back.fr/i/<code>`.
 *
 * Elle n'est vue QUE par les personnes qui n'ont pas encore l'app. Quand
 * SafeBack est installée, iOS et Android ouvrent le lien directement dans
 * l'app (voir `/.well-known/`) et cette page n'est jamais affichée.
 *
 * Elle doit dire d'abord POURQUOI la personne est là — quelqu'un lui confie
 * sa sécurité — et seulement ensuite que l'app est nécessaire pour accepter.
 * La première version mettait « Installer SafeBack » en avant, et les
 * retours étaient unanimes : « l'invitation demande juste de télécharger
 * l'app ». Le bouton n'est plus le sujet, l'invitation l'est.
 *
 * Puis la phrase indispensable : REVENIR sur ce même lien après
 * l'installation. Les systèmes ne transmettent rien à travers une
 * installation — sans ce retour, l'invitation est perdue.
 *
 * Le bouton s'adapte au téléphone (App Store, Google Play, ou « bientôt sur
 * Android » tant que la fiche Play n'existe pas) : voir `BoutonInstaller`.
 *
 * Confidentialité : le code permet de devenir le protecteur de quelqu'un.
 * La page ne l'affiche pas, ne le journalise pas et ne le transmet à aucun
 * service tiers. Le prénom de la personne qui invite n'apparaît pas non
 * plus : la page est publique, et un prénom n'a pas à circuler.
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

const STEPS = [
  {
    n: "1",
    title: "Installe Safe Back",
    text: "Avec le bouton ci-dessus. L'installation prend moins d'une minute.",
  },
  {
    n: "2",
    title: "Reviens sur ce lien",
    text: "Depuis le message où tu l'as reçu. Il s'ouvrira directement dans l'app.",
  },
  {
    n: "3",
    title: "Accepte l'invitation",
    text: "Tu deviens son proche de confiance. Et si tu veux, tu peux lui demander de veiller sur toi en retour.",
  },
];

// L'URL porte le code (`/i/<code>`), mais la page ne le lit pas : c'est l'app
// qui s'en charge, une fois installée, quand la personne revient sur le lien.
export default function InvitationPage() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavande/80 mb-4">
            Invitation
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Quelqu&apos;un te confie <span className="gradient-text">sa sécurité</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-3">
            Tu as reçu ce lien parce qu&apos;une personne t&apos;a choisi comme{" "}
            <strong className="text-white">proche de confiance</strong> sur Safe Back.
            Si elle déclenche une alerte, tu es prévenu aussitôt et tu vois où elle est.
          </p>
          <p className="text-white/55 text-base leading-relaxed mb-8">
            Pour accepter, il te faut l&apos;app. C&apos;est gratuit.
          </p>

          <BoutonInstaller libelle="Installer l'app pour accepter" />

          {/* La phrase indispensable : sans ce retour, l'invitation est perdue. */}
          <div className="mt-8 glass-card rounded-2xl px-5 py-4 text-left">
            <p className="font-semibold text-white leading-snug">
              Une fois l&apos;app installée, reviens sur ce lien pour accepter
              l&apos;invitation.
            </p>
            <p className="text-white/50 text-sm mt-2 leading-relaxed">
              Le téléphone ne garde pas l&apos;invitation pendant l&apos;installation.
              C&apos;est en rouvrant ce lien, depuis le message où tu l&apos;as reçu,
              que l&apos;app la retrouve.
            </p>
          </div>

          <ol className="mt-10 space-y-5 text-left">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-white/35 text-xs leading-relaxed">
            Tu as déjà Safe Back ? Ouvre ce lien depuis le message où tu
            l&apos;as reçu : il s&apos;ouvrira directement dans l&apos;app.
          </p>
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
