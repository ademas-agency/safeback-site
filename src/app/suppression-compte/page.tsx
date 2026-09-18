import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL, DATE_MAJ } from "@/lib/legal";

/**
 * Page « Supprimer votre compte » : `https://safe-back.fr/suppression-compte`.
 *
 * Google Play exige, pour toute app qui crée des comptes, une page web publique
 * qui explique comment supprimer son compte — y compris SANS l'application, pour
 * qui a perdu son téléphone ou désinstallé l'app. Apple la demande aussi dans
 * la fiche de confidentialité. Même logique que la page équivalente de
 * La Cachette (`public/legal/suppression-compte.html` dans la-cachette-front).
 *
 * Ce que la page annonce est ce que fait réellement l'edge function
 * `delete-account` du dépôt de l'app : à garder alignés. Si la fonction change
 * (nouvelle table, nouvelle rétention), cette page change avec.
 */

export const metadata: Metadata = {
  title: "Supprimer votre compte",
  description:
    "Comment supprimer votre compte Safe Back et les données associées, depuis l'application ou par e-mail si vous n'y avez plus accès.",
  alternates: { canonical: "/suppression-compte" },
};

const OBJET = "Suppression de mon compte Safe Back";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(OBJET)}`;

const DEPUIS_APP = [
  <>Ouvrez l&apos;application Safe Back et connectez-vous.</>,
  <>
    Touchez votre <strong>profil</strong>, depuis l&apos;écran d&apos;accueil.
  </>,
  <>
    Faites défiler jusqu&apos;en bas, jusqu&apos;à <strong>« Supprimer mon compte »</strong>.
  </>,
  <>Confirmez la suppression.</>,
];

const SUPPRIME = [
  "Votre compte et vos identifiants de connexion.",
  "Votre prénom, votre nom, votre photo de profil et votre présentation.",
  "Vos contacts de confiance et vos proches, dans les deux sens : vous disparaissez aussi de leur liste.",
  "Vos alertes, l'historique de position qui les accompagne et votre dernière position connue.",
  "Vos enregistrements audio et vidéo, fichiers compris.",
  "Les invitations que vous avez envoyées.",
  "Votre présence dans la communauté et votre adresse de domicile.",
];

const CONSERVE = [
  <>
    Chez vos proches, la trace qu&apos;<strong>un</strong> proche a été prévenu de leurs alertes : votre
    prénom y est remplacé par « Un proche ». Savoir combien de personnes ont été alertées garde
    son sens sans vous nommer.
  </>,
  <>
    Les données que la loi nous oblige à conserver, le temps strictement nécessaire.
  </>,
  <>
    <strong>Votre abonnement</strong>, s&apos;il est en cours : il est géré par Apple ou Google, pas
    par nous, et la suppression du compte n&apos;y met pas fin. Résiliez-le depuis les réglages
    de votre compte Apple ou Google Play, sinon il continuera d&apos;être facturé.
  </>,
];

export default function SuppressionComptePage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Supprimer votre compte Safe Back
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          Deux façons de procéder : directement dans l&apos;application, ou par e-mail si vous
          n&apos;y avez plus accès.
        </p>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Depuis l&apos;application</h2>
          <ol className="space-y-3">
            {DEPUIS_APP.map((etape, i) => (
              <li key={i} className="flex gap-4 text-gray-700 leading-relaxed">
                <span
                  aria-hidden
                  className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#7C3AED] text-white text-sm font-bold flex items-center justify-center"
                >
                  {i + 1}
                </span>
                <span>{etape}</span>
              </li>
            ))}
          </ol>
          <p className="text-gray-700 leading-relaxed mt-5">
            La suppression est <strong>immédiate et irréversible</strong>. Elle se fait sur iPhone
            comme sur Android, au même endroit.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sans l&apos;application</h2>
          <p className="text-gray-700 leading-relaxed">
            Si vous n&apos;avez plus accès à l&apos;application ou à votre téléphone, écrivez-nous à :
          </p>
          <p className="my-4">
            <a
              href={MAILTO}
              className="inline-block font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-400 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed">Indiquez dans votre message :</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
            <li>
              l&apos;objet <strong>« {OBJET} »</strong> ;
            </li>
            <li>l&apos;adresse e-mail ou le numéro de téléphone avec lequel vous vous êtes inscrit.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-5">
            Nous traitons votre demande sous <strong>30 jours</strong> et vous confirmons la
            suppression par retour. Nous pouvons vous demander de confirmer la demande depuis
            l&apos;adresse ou le numéro associé au compte, pour éviter qu&apos;un tiers supprime votre
            compte à votre place.
          </p>
        </section>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ce qui est supprimé</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {SUPPRIME.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ce qui peut être conservé</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {CONSERVE.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="border-l-4 border-[#7C3AED] pl-4 text-gray-600 leading-relaxed">
            <p>
              Conformément au RGPD, vous disposez également d&apos;un droit d&apos;accès, de
              rectification, de portabilité et d&apos;opposition sur vos données. Voir la{" "}
              <Link href="/confidentialite" className="underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">Safe Back — dernière mise à jour : {DATE_MAJ}</p>
          <div className="flex items-center gap-6">
            <Link href="/cgu" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              CGU
            </Link>
            <Link href="/confidentialite" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
