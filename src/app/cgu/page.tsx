import Link from "next/link";
import Image from "next/image";
import { EDITEUR, SIRET, ADRESSE, CONTACT_EMAIL, DPO, AGE_MINIMUM, DATE_MAJ } from "@/lib/legal";

export const metadata = {
  title: "Conditions générales d'utilisation — Safe Back",
  description: "Conditions générales d'utilisation de l'application Safe Back.",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SafeBack"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-gray-900">
              Safe<span className="text-[#7C3AED]">Back</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Conditions générales d&apos;utilisation
        </h1>
        <p className="text-gray-500 mb-8">Safe Back</p>
        <p className="text-sm text-gray-400 mb-12">Dernière mise à jour : {DATE_MAJ}</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes conditions régissent l&apos;utilisation de l&apos;application Safe Back, éditée par {EDITEUR}, SIRET&nbsp;{SIRET}, dont le siège est situé {ADRESSE}, ci-après &laquo; l&apos;éditeur &raquo;. Installer ou utiliser l&apos;application vaut acceptation des présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Ce que fait Safe Back</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Safe Back est une application de sécurité personnelle collaborative. Elle permet de :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>déclencher une alerte, discrètement, qui prévient les proches que vous avez désignés ;</li>
              <li>partager votre position avec ces proches, selon le mode que vous choisissez ;</li>
              <li>être accompagné pendant un trajet, avec signalement d&apos;une anomalie ou d&apos;une arrivée ;</li>
              <li>enregistrer de l&apos;audio et de la vidéo pendant une alerte ;</li>
              <li>être visible d&apos;autres utilisateurs à proximité pendant une alerte, si vous activez la communauté.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Ce que Safe Back n&apos;est pas</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Safe Back n&apos;est pas un service de secours et ne remplace en aucun cas l&apos;appel aux services d&apos;urgence.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              En cas de danger, appelez le 112 (urgences européennes), le 17 (police) ou le 18 (pompiers). Safe Back ne transmet aucune alerte aux services de secours ou aux forces de l&apos;ordre : le bouton d&apos;appel de l&apos;application ouvre simplement le composeur de votre téléphone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              L&apos;application dépend de facteurs que l&apos;éditeur ne maîtrise pas : couverture réseau, batterie, autorisations accordées, réglages du système, disponibilité des prestataires d&apos;envoi de SMS et de notifications, et disponibilité de l&apos;appareil de la personne destinataire. La réception d&apos;une alerte par un proche ne peut donc pas être garantie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Votre compte</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L&apos;inscription se fait par numéro de téléphone, validé par un code reçu par SMS. Vous vous engagez à fournir un numéro dont vous êtes titulaire et à ne pas usurper l&apos;identité d&apos;un tiers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vous êtes responsable de l&apos;usage fait depuis votre compte. Vous pouvez le supprimer à tout moment depuis votre profil, ou par e-mail si vous n&apos;avez plus accès à l&apos;application (voir <Link href="/suppression#compte" className="underline">Supprimer votre compte</Link>) ; la suppression est définitive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Vos engagements</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Vous vous engagez à :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>ne pas déclencher d&apos;alerte en l&apos;absence de motif réel — une alerte mobilise l&apos;attention de vos proches et, si vous l&apos;activez, celle de la communauté ;</li>
              <li>n&apos;ajouter comme contact de confiance que des personnes que vous connaissez et qui acceptent d&apos;être prévenues ;</li>
              <li>respecter la vie privée des autres utilisateurs, et n&apos;utiliser les positions auxquelles vous avez accès qu&apos;aux fins de veiller sur eux ;</li>
              <li>ne pas utiliser l&apos;application pour surveiller quelqu&apos;un à son insu ou contre son gré ;</li>
              <li>ne pas enregistrer autrui dans des circonstances où l&apos;enregistrement serait illicite.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              L&apos;éditeur peut suspendre ou fermer un compte en cas de manquement grave, notamment d&apos;usage détourné à des fins de surveillance ou de harcèlement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Partage de position et réciprocité</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Un lien avec un proche n&apos;est actif que si vous vous êtes ajoutés tous les deux. Tant que ce n&apos;est pas le cas, aucune position ne circule.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vous contrôlez votre partage à tout moment : jamais, seulement pendant une alerte, ou en permanence. Retirer un partage prend effet immédiatement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Abonnement</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L&apos;application est utilisable gratuitement. L&apos;alerte, le partage de position et les trajets accompagnés sont inclus sans abonnement.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">L&apos;abonnement payant donne accès à :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>la mise à l&apos;abri des enregistrements hors de votre téléphone pendant une alerte, et leur conservation pendant toute la durée de l&apos;abonnement ;</li>
              <li>l&apos;accès à ces enregistrements après un changement de téléphone ;</li>
              <li>un nombre illimité de contacts de confiance et de trajets favoris.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Sans abonnement, les enregistrements restent sur l&apos;appareil et y sont conservés 7 jours.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Modalités.</strong> Les abonnements sont vendus et encaissés par Apple via l&apos;App Store. Ils se renouvellent automatiquement à la fin de chaque période, sauf annulation au moins 24 heures avant l&apos;échéance depuis les réglages du compte Apple. Les prix affichés sont ceux de l&apos;App Store. La gestion et la résiliation se font dans les réglages du compte Apple.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              À la fin de l&apos;abonnement, les enregistrements déjà sauvegardés restent accessibles 30 jours, puis sont supprimés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Safe Zones et lieux partenaires</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;application peut afficher des lieux partenaires présentés comme refuges. Ces lieux sont exploités par des tiers indépendants. L&apos;éditeur ne garantit ni leur ouverture effective, ni l&apos;accueil qui y sera réservé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L&apos;application, sa marque, son interface et ses contenus sont la propriété de l&apos;éditeur. Vous ne disposez que d&apos;un droit d&apos;usage personnel et non exclusif.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vos enregistrements et vos données restent à vous. L&apos;éditeur ne les exploite pas à d&apos;autres fins que le fonctionnement du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Disponibilité</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;éditeur s&apos;efforce d&apos;assurer la disponibilité du service, sans pouvoir la garantir en continu. Des interruptions peuvent survenir pour maintenance ou du fait d&apos;un prestataire.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Modification des conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              Toute modification substantielle sera portée à votre connaissance dans l&apos;application. Continuer à utiliser Safe Back après cette information vaut acceptation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">12. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SafeBack. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/confidentialite" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Retour au site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
