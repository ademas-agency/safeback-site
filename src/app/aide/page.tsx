import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/legal";

/**
 * Page d'aide : `https://safe-back.fr/aide`.
 *
 * Née d'un retour des premiers utilisateurs : personne ne savait qu'un widget
 * existe. Chaque rubrique a une ancre stable (`#widget-iphone`,
 * `#widget-android`) pour pouvoir être envoyée telle quelle par message.
 * À enrichir au fil des retours, une rubrique par question qui revient.
 */

export const metadata: Metadata = {
  title: "Aide",
  description:
    "Comment ajouter le widget Safe Back sur l'écran d'accueil de votre iPhone ou de votre téléphone Android, pour déclencher l'alerte sans ouvrir l'app.",
  alternates: { canonical: "/aide" },
};

const IPHONE = [
  <>Reste appuyé sur un espace vide de l&apos;écran d&apos;accueil, jusqu&apos;à ce que les icônes se mettent à bouger.</>,
  <>
    Touche <strong>« + »</strong> en haut à gauche. Sur les iPhone récents, touche d&apos;abord{" "}
    <strong>« Modifier »</strong>, puis <strong>« Ajouter un widget »</strong>.
  </>,
  <>
    Tape <strong>Safe Back</strong> dans la recherche.
  </>,
  <>
    Choisis la taille qui te convient, puis touche <strong>« Ajouter le widget »</strong>.
  </>,
  <>Place-le où tu veux sur l&apos;écran, puis touche « OK » en haut à droite.</>,
];

const ANDROID = [
  <>Reste appuyé sur un espace vide de l&apos;écran d&apos;accueil.</>,
  <>
    Touche <strong>« Widgets »</strong>.
  </>,
  <>
    Fais défiler ou cherche jusqu&apos;à <strong>Safe Back</strong>.
  </>,
  <>Reste appuyé sur le widget, puis dépose-le sur l&apos;écran d&apos;accueil.</>,
];

function Etapes({ etapes }: { etapes: React.ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {etapes.map((e, i) => (
        <li key={i} className="flex gap-4 text-gray-700 leading-relaxed">
          <span
            aria-hidden
            className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#7C3AED] text-white text-sm font-bold flex items-center justify-center"
          >
            {i + 1}
          </span>
          <span>{e}</span>
        </li>
      ))}
    </ol>
  );
}

export default function AidePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SafeBack" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold text-gray-900">
              Safe<span className="text-[#7C3AED]">Back</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Aide</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Les questions qui reviennent, et leurs réponses pas à pas.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Le widget</h2>
          <p className="text-gray-600 leading-relaxed">
            Safe Back a un widget pour l&apos;écran d&apos;accueil. Il permet de{" "}
            <strong>déclencher l&apos;alerte</strong> ou de lancer un retour accompagné{" "}
            <strong>sans ouvrir l&apos;app</strong>, d&apos;un seul geste. Dans une situation
            d&apos;urgence, c&apos;est le chemin le plus court : pense à l&apos;ajouter dès
            maintenant.
          </p>
        </section>

        <section id="widget-iphone" className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-6 scroll-mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ajouter le widget sur iPhone</h3>
          <Etapes etapes={IPHONE} />
          <p className="text-gray-600 text-sm leading-relaxed mt-5">
            Sur iPhone, Safe Back propose aussi un bouton d&apos;alerte pour le centre de
            contrôle et l&apos;écran verrouillé : réglages de l&apos;iPhone, « Centre de
            contrôle », puis « Ajouter une commande » et « Alerte Safe Back ».
          </p>
        </section>

        <section id="widget-android" className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-10 scroll-mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ajouter le widget sur Android</h3>
          <Etapes etapes={ANDROID} />
          <p className="text-gray-600 text-sm leading-relaxed mt-5">
            Le chemin varie un peu selon les marques : sur certains téléphones, « Widgets »
            se trouve dans le menu qui apparaît après l&apos;appui long, sur d&apos;autres en bas
            de l&apos;écran.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Autres questions</h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>Supprimer ses données ou son compte</strong> : tout est expliqué sur la page{" "}
            <Link href="/suppression" className="underline">Supprimer vos données ou votre compte</Link>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Une question qui n&apos;est pas ici ?</strong> Écris-nous à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> ou passe par la{" "}
            <Link href="/contact" className="underline">page Contact</Link>.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SafeBack</p>
          <div className="flex items-center gap-6">
            <Link href="/cgu" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">CGU</Link>
            <Link href="/confidentialite" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
