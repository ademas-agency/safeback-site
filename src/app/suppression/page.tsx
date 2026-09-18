import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ADRESSE, CONTACT_EMAIL, DATE_MAJ, EDITEUR } from "@/lib/legal";

/**
 * Page « Supprimer vos données ou votre compte » : `https://safe-back.fr/suppression`.
 *
 * UNE page pour les DEUX URL que Google Play réclame — Google l'autorise
 * explicitement, à condition que la page traite les deux sujets :
 *   • « Suppression de compte »  (Contenu de l'application) → /suppression#compte
 *   • « Suppression des données » (Sécurité des données)   → /suppression#donnees
 * D'où le nom de la page, qui ne parle pas que du compte : une URL en
 * « suppression-compte » dans le champ « suppression des données » se lirait
 * comme une erreur, et c'est un relecteur humain qui la lit.
 *
 * Les deux ancres `compte` et `donnees` sont des `id` sur les titres de
 * section : chaque champ Play pointe vers la section qui le concerne. Ne pas
 * les renommer, ni l'URL — elle est inscrite dans la fiche Play.
 *
 * Publique, atteignable sans connexion, reliée depuis le pied de page. Texte
 * rédigé côté app (docs/page-suppression.md, 18/09/2026). Ce qu'il annonce est
 * ce que fait réellement l'edge function `delete-account` du dépôt de l'app —
 * y compris la photo de profil, dont la suppression du fichier dépend d'un
 * correctif déployé (version 11 de la fonction). Si la fonction change, cette
 * page change avec.
 */

export const metadata: Metadata = {
  title: "Supprimer vos données ou votre compte",
  description:
    "Comment supprimer votre compte Safe Back, ou seulement une partie de vos données, depuis l'application ou par e-mail si vous n'y avez plus accès.",
  alternates: { canonical: "/suppression" },
};

const OBJET = "Suppression de mon compte Safe Back";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(OBJET)}`;

const ETAPES = [
  <>
    Ouvrez Safe Back et touchez <strong>votre photo</strong>, en haut à droite de l&apos;accueil.
  </>,
  <>
    Touchez <strong>l&apos;engrenage</strong>, en haut à droite de votre profil.
  </>,
  <>
    Tout en bas, touchez <strong>Supprimer mon compte</strong>.
  </>,
  <>Confirmez.</>,
];

const SUPPRIME = [
  "votre compte et votre numéro de téléphone ;",
  "votre prénom, votre nom, votre photo de profil et votre présentation ;",
  "l'adresse de votre domicile et vos trajets favoris ;",
  "la liste de vos proches et les liens dans les deux sens, ceux que vous avez choisis et ceux qui vous ont choisi ;",
  "vos alertes, leur date, leur position et le journal des personnes prévenues ;",
  "vos enregistrements audio et vidéo, sur nos serveurs comme dans nos sauvegardes de fichiers ;",
  "votre historique de position, votre dernière position connue et votre présence dans la communauté ;",
  "les invitations que vous avez envoyées ;",
  "les jetons qui permettaient de vous envoyer des notifications.",
];

const HORS_DE_PORTEE = [
  {
    titre: "Les SMS déjà reçus.",
    texte:
      "Un message d'alerte parti chez un proche est chez lui ; nous ne pouvons pas le retirer de son téléphone.",
  },
  {
    titre: "Ce que vous avez vous-même partagé.",
    texte:
      "Une vidéo que vous avez transmise à quelqu'un, ou enregistrée ailleurs, ne dépend plus de nous.",
  },
  {
    titre: "Les journaux techniques de nos prestataires.",
    texte:
      "L'opérateur qui a acheminé un SMS et l'outil qui collecte les rapports de plantage conservent leurs propres journaux, selon leurs propres durées. Nous n'y avons pas accès et ne pouvons pas les accélérer.",
  },
];

const PARTIEL = [
  {
    quoi: "un enregistrement",
    ou: "Profil → Mes enregistrements → Supprimer.",
    note: "Il part de votre téléphone et de nos serveurs.",
  },
  { quoi: "un trajet favori", ou: "Profil → Trajets favoris → Retirer." },
  {
    quoi: "un proche",
    ou: "sa fiche, ou Profil → Mes proches.",
    note: "Vous pouvez aussi ne lui couper que les alertes, ou que la position, et garder le lien.",
  },
  { quoi: "l'adresse de votre domicile", ou: "Profil → Adresse de la maison → Supprimer." },
  { quoi: "le mot d'alerte", ou: "Profil → Mot d'alerte → Supprimer le mot d'alerte." },
  {
    quoi: "votre présence dans la communauté",
    ou: "coupez la communauté dans votre profil,",
    note: "et votre position en est retirée.",
  },
];

/** Titre de section ; `id` en fait une ancre (#compte, #donnees) pour la fiche Play. */
function Titre({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-bold text-gray-900 mb-4 scroll-mt-6">
      {children}
    </h2>
  );
}

export default function SuppressionPage() {
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
          Supprimer vos données ou votre compte
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Vos données vous appartiennent. Vous pouvez en effacer une partie, ou supprimer votre
          compte entièrement, à tout moment, sans avoir à le justifier et sans nous écrire.
        </p>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-6">
          <Titre id="compte">Supprimer votre compte, depuis l&apos;application</Titre>
          <p className="text-gray-700 leading-relaxed mb-4">
            C&apos;est le chemin le plus rapide, et la suppression est immédiate.
          </p>
          <ol className="space-y-3">
            {ETAPES.map((etape, i) => (
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
            C&apos;est fait. Rien ne reste en attente, il n&apos;y a pas de délai de rétractation, et
            nous ne conservons pas de copie.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 mb-10">
          <Titre>Supprimer votre compte, sans l&apos;application</Titre>
          <p className="text-gray-700 leading-relaxed">
            Si vous n&apos;avez plus accès à votre téléphone ou à l&apos;application, écrivez à
          </p>
          <p className="my-4">
            <a
              href={MAILTO}
              className="inline-block font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-400 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed">
            en indiquant <strong>le numéro de téléphone du compte à supprimer</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-5">
            Nous vous répondons sous un mois, comme le RGPD nous y oblige, et le plus souvent sous
            quelques jours. Nous vous demanderons de confirmer que le numéro est bien le vôtre avant
            de supprimer quoi que ce soit : c&apos;est la seule protection contre quelqu&apos;un qui
            demanderait la suppression du compte d&apos;un autre.
          </p>
        </section>

        <div className="space-y-10">
          <section>
            <Titre>Ce qui est supprimé</Titre>
            <p className="text-gray-600 leading-relaxed mb-3">
              Tout, immédiatement et sans retour possible :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {SUPPRIME.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Nous effaçons aussi les traces que votre compte avait laissées{" "}
              <strong>chez les autres</strong> : la référence à votre compte dans leurs listes, et
              votre prénom dans les notifications qu&apos;ils ont reçues. Vos proches ne garderont
              donc pas votre nom dans leur application.
            </p>
          </section>

          <section>
            <Titre>Ce qui ne peut pas être supprimé</Titre>
            <p className="text-gray-600 leading-relaxed mb-3">Par honnêteté, trois choses nous échappent :</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              {HORS_DE_PORTEE.map((h) => (
                <li key={h.titre}>
                  <strong className="text-gray-800">{h.titre}</strong> {h.texte}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Enfin, les vidéos encore présentes <strong>sur votre téléphone</strong> ne sont pas
              chez nous : elles partent quand vous désinstallez l&apos;application.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <Titre id="donnees">Supprimer une partie de vos données, sans supprimer votre compte</Titre>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vous n&apos;êtes pas obligé de tout effacer pour effacer quelque chose. Depuis
              l&apos;application, à tout moment :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {PARTIEL.map((p) => (
                <li key={p.quoi}>
                  <strong className="text-gray-900">{p.quoi}</strong> : {p.ou}
                  {p.note && <> {p.note}</>}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mt-5">
              Pour tout le reste, votre photo de profil, votre présentation, une alerte passée,
              écrivez à{" "}
              <a href={MAILTO} className="font-semibold text-gray-900 underline">
                {CONTACT_EMAIL}
              </a>{" "}
              : nous supprimons ce que vous demandez, sans toucher au compte.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <Titre>Votre abonnement</Titre>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Supprimer votre compte ne résilie pas votre abonnement Safe Back Plus.</strong>{" "}
              Les abonnements sont gérés par la boutique qui les encaisse, pas par nous :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                sur Android, dans <strong>Google Play → Menu → Paiements et abonnements → Abonnements</strong> ;
              </li>
              <li>
                sur iPhone, dans <strong>Réglages → votre nom → Abonnements</strong>.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Pensez à le faire avant de supprimer le compte : ensuite, l&apos;application ne pourra
              plus vous y conduire.
            </p>
          </section>

          <section>
            <Titre>Nous joindre</Titre>
            <p className="text-gray-600 leading-relaxed">
              {EDITEUR}
              <br />
              {ADRESSE}
              <br />
              <a href={MAILTO} className="font-semibold text-gray-900 underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Vous pouvez aussi introduire une réclamation auprès de la{" "}
              <a href="https://www.cnil.fr" rel="noopener" target="_blank" className="underline">
                CNIL
              </a>
              .
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Nos{" "}
              <Link href="/cgu" className="underline">
                conditions générales d&apos;utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/confidentialite" className="underline">
                politique de confidentialité
              </Link>{" "}
              décrivent ce que nous collectons et combien de temps nous le conservons.
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
