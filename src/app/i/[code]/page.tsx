import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_DOWNLOAD_URL, SITE_NAME } from "@/lib/site";

/**
 * Page d'invitation : `https://safe-back.fr/i/<code>`.
 *
 * Elle n'est vue QUE par les personnes qui n'ont pas encore l'app. Quand
 * SafeBack est installée, iOS ouvre le lien directement dans l'app (voir
 * `/.well-known/apple-app-site-association`) et cette page n'est jamais
 * affichée.
 *
 * Son seul but : faire installer l'app, puis faire REVENIR sur ce même lien.
 * iOS ne transmet rien à travers une installation — sans ce retour,
 * l'invitation est perdue. D'où la phrase mise en avant plus bas.
 *
 * Confidentialité : le code permet de devenir le protecteur de quelqu'un.
 * La page ne l'affiche pas, ne le journalise pas et ne le transmet à aucun
 * service tiers. Il n'y a d'ailleurs aucun outil d'analyse sur le site.
 * Le prénom de la personne qui invite n'apparaît pas non plus : la page est
 * publique, et un prénom n'a pas à circuler.
 */

export const metadata: Metadata = {
  title: "Invitation",
  description: "Quelqu'un t'a choisi pour veiller sur elle. Installe SafeBack, puis reviens sur ce lien pour accepter l'invitation.",
  // Page publique mais sans intérêt pour un moteur de recherche : chaque code
  // donnerait une URL de plus à indexer, sans aucun contenu propre.
  robots: { index: false, follow: false },
  // Aperçu du lien dans Messages, WhatsApp… : le titre et l'image ne doivent
  // rien révéler de la personne qui invite.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "Quelqu'un t'a choisi pour veiller sur elle",
    description: "Installe SafeBack, puis reviens sur ce lien pour accepter l'invitation.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SafeBack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quelqu'un t'a choisi pour veiller sur elle",
    description: "Installe SafeBack, puis reviens sur ce lien pour accepter l'invitation.",
    images: ["/og.png"],
  },
};

const STEPS = [
  {
    n: "1",
    title: "Installe SafeBack",
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
    text: "Et choisis, si tu le souhaites, de te faire veiller en retour.",
  },
];

// L'URL porte le code (`/i/<code>`), mais la page ne le lit pas : c'est l'app
// qui s'en charge, une fois installée, quand la personne revient sur le lien.
export default function InvitationPage() {
  const externe = /^https?:\/\//.test(APP_DOWNLOAD_URL);

  return (
    <div className="relative min-h-screen flex flex-col bg-nuit text-white overflow-hidden">
      {/* Halo de fond, même palette que le reste du site */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-blue/25 to-violet/25 blur-[120px]"
      />

      <header className="relative z-10 px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="SafeBack"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
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
            Quelqu&apos;un t&apos;a choisi pour{" "}
            <span className="gradient-text">veiller sur elle</span>
          </h1>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8">
            Avec SafeBack, tu es prévenu si elle a besoin de toi : trajet
            partagé en temps réel, alerte d&apos;urgence en un geste.
          </p>

          <a
            href={APP_DOWNLOAD_URL}
            rel={externe ? "noopener" : undefined}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-white text-nuit px-8 py-4 rounded-2xl font-semibold text-base transition-shadow hover:shadow-[0_8px_30px_rgba(47,107,255,0.25)]"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Installer SafeBack
          </a>

          {/* La phrase indispensable : sans ce retour, l'invitation est perdue. */}
          <div className="mt-8 glass-card rounded-2xl px-5 py-4 text-left">
            <p className="font-semibold text-white leading-snug">
              Une fois l&apos;app installée, reviens sur ce lien pour accepter
              l&apos;invitation.
            </p>
            <p className="text-white/50 text-sm mt-2 leading-relaxed">
              iOS ne garde pas l&apos;invitation pendant l&apos;installation.
              C&apos;est en rouvrant ce lien, depuis le message où tu l&apos;as
              reçu, que l&apos;app la retrouve.
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
            Tu as déjà SafeBack ? Ouvre ce lien depuis le message où tu
            l&apos;as reçu : il s&apos;ouvrira directement dans l&apos;app.
          </p>
        </div>
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
