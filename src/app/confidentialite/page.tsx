import Link from "next/link";
import Image from "next/image";
import { EDITEUR, SIRET, ADRESSE, CONTACT_EMAIL, DPO, AGE_MINIMUM, DATE_MAJ } from "@/lib/legal";

export const metadata = {
  title: "Politique de confidentialité — Safe Back",
  description: "Politique de confidentialité de l'application Safe Back.",
};

export default function ConfidentialitePage() {
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
          Politique de confidentialité
        </h1>
        <p className="text-gray-500 mb-8">Safe Back</p>
        <p className="text-sm text-gray-400 mb-12">Dernière mise à jour : {DATE_MAJ}</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Qui est responsable de vos données</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Éditeur</p>
                  <p className="text-gray-900 font-medium">{EDITEUR}<br />SIRET&nbsp;{SIRET}</p>
                </div>
                <div>
                  <p className="text-gray-500">Siège</p>
                  <p className="text-gray-900 font-medium">{ADRESSE}</p>
                </div>
                <div>
                  <p className="text-gray-500">Contact</p>
                  <p className="text-gray-900 font-medium"><a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
                </div>
                <div>
                  <p className="text-gray-500">Délégué à la protection des données</p>
                  <p className="text-gray-900 font-medium">{DPO}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              L&apos;éditeur est responsable du traitement au sens du RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Ce que Safe Back collecte, et pourquoi</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.1 Votre compte</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Donnée</th>
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Pourquoi</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Base légale</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Numéro de téléphone</td>
                    <td className="py-3 pr-4">Créer et sécuriser votre compte par un code reçu par SMS, et permettre à vos proches de vous retrouver</td>
                    <td className="py-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Prénom, nom</td>
                    <td className="py-3 pr-4">Vous identifier auprès de vos proches</td>
                    <td className="py-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Photo de profil, présentation</td>
                    <td className="py-3 pr-4">Vous reconnaître sur la carte et dans la communauté</td>
                    <td className="py-3">Consentement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.2 Votre position</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Donnée</th>
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Pourquoi</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Base légale</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Position en temps réel</td>
                    <td className="py-3 pr-4">Permettre à vos contacts de confiance et aux amis que vous choisissez de voir où vous êtes</td>
                    <td className="py-3">Consentement</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Adresse de votre domicile</td>
                    <td className="py-3 pr-4">Lancer un trajet &laquo; retour à la maison &raquo; et détecter votre arrivée</td>
                    <td className="py-3">Consentement</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Destination d&apos;un trajet en cours</td>
                    <td className="py-3 pr-4">Afficher votre itinéraire à ceux qui vous accompagnent</td>
                    <td className="py-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Historique de position pendant une alerte</td>
                    <td className="py-3 pr-4">Reconstituer votre parcours pendant l&apos;incident</td>
                    <td className="py-3">Intérêt légitime</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Position pour la communauté</td>
                    <td className="py-3 pr-4">Être joignable par d&apos;autres utilisateurs à proximité, uniquement si vous activez la communauté</td>
                    <td className="py-3">Consentement</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Vous choisissez à tout moment votre mode de partage : jamais, seulement pendant une alerte, ou en permanence. Le retirer coupe le partage immédiatement.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.3 Vos proches</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Safe Back enregistre le nom et le numéro des contacts que vous désignez pour les prévenir par SMS si vous déclenchez une alerte, même s&apos;ils n&apos;ont pas l&apos;application. Un lien n&apos;est actif que si les deux personnes se sont ajoutées. Avant cela, aucune position ne circule.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.4 Vos alertes et vos enregistrements</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Safe Back conserve la date, l&apos;heure, la position et l&apos;état de chaque alerte, le journal des personnes prévenues, et les enregistrements audio et vidéo.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sans abonnement, les enregistrements restent sur votre téléphone. Avec un abonnement, ils sont aussi envoyés sur nos serveurs pendant l&apos;alerte, afin de survivre à la perte ou au vol de l&apos;appareil.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.5 Données techniques</h3>
            <p className="text-gray-600 leading-relaxed">
              Jetons de notification Apple ou Google, pour vous envoyer les alertes ; état de votre abonnement ; date de dernière activité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Combien de temps c&apos;est conservé</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Donnée</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Enregistrements, sans abonnement</td>
                    <td className="py-3">7 jours, puis suppression automatique</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Enregistrements, avec abonnement</td>
                    <td className="py-3">Durée de l&apos;abonnement + 30 jours</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Dernière position connue</td>
                    <td className="py-3">Écrasée à chaque mise à jour</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Alertes et historique de position</td>
                    <td className="py-3">Jusqu&apos;à la suppression du compte</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Compte et contacts</td>
                    <td className="py-3">Jusqu&apos;à la suppression du compte</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Qui d&apos;autre voit ces données</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">4.1 Les personnes que vous choisissez</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Vos contacts de confiance reçoivent vos alertes et peuvent voir votre position selon le mode que vous avez choisi.</li>
              <li>Vos amis voient votre position si vous vous êtes ajoutés mutuellement.</li>
              <li>Les autres membres de la communauté, si vous l&apos;avez activée, voient votre position uniquement pendant une alerte.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Aucune de ces personnes ne voit votre adresse de domicile, votre numéro ni vos enregistrements.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">4.2 Nos prestataires techniques</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Prestataire</th>
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Rôle</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Localisation</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Supabase</td>
                    <td className="py-3 pr-4">Hébergement, base de données, stockage, notifications</td>
                    <td className="py-3">Union européenne (Irlande)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Apple</td>
                    <td className="py-3 pr-4">Notifications, App Store, encaissement</td>
                    <td className="py-3">International</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Twilio</td>
                    <td className="py-3 pr-4">Envoi des SMS aux proches</td>
                    <td className="py-3">Hors UE</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">RevenueCat</td>
                    <td className="py-3 pr-4">Gestion des abonnements</td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Google / Firebase</td>
                    <td className="py-3 pr-4">Notifications sur Android</td>
                    <td className="py-3">Hors UE</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Mapbox</td>
                    <td className="py-3 pr-4">Fond de carte, recherche d&apos;adresses, itinéraires</td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Nous ne vendons aucune donnée et n&apos;en cédons aucune à des fins publicitaires.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">4.3 Les autorités</h3>
            <p className="text-gray-600 leading-relaxed">
              Nous répondons aux demandes des autorités judiciaires dans le cadre prévu par la loi. Safe Back n&apos;effectue aucune transmission automatique aux services de secours ou aux forces de l&apos;ordre.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Vous pouvez à tout moment :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>accéder à vos données et en demander une copie ;</li>
              <li>les corriger depuis votre profil ;</li>
              <li>supprimer votre compte depuis l&apos;application, ou par e-mail si vous n&apos;y avez plus accès (la suppression efface votre compte, vos contacts, vos alertes, votre historique de position et vos enregistrements) : voir la page <Link href="/suppression-compte" className="underline">Supprimer votre compte</Link> ;</li>
              <li>retirer votre consentement au partage de position ou à la communauté, sans perdre l&apos;accès à l&apos;alerte ;</li>
              <li>vous opposer à un traitement ou demander sa limitation ;</li>
              <li>introduire une réclamation auprès de la CNIL.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Pour exercer ces droits, écrivez à <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>. Nous répondons sous un mois.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Permissions demandées par l&apos;application</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Permission</th>
                    <th className="text-left py-3 pr-4 text-gray-500 font-medium">Utilisation</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Si vous refusez</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Position (y compris en arrière-plan)</td>
                    <td className="py-3 pr-4">Partager votre position, accompagner un trajet</td>
                    <td className="py-3">L&apos;alerte fonctionne, mais sans position</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Microphone</td>
                    <td className="py-3 pr-4">Enregistrer pendant une alerte</td>
                    <td className="py-3">Pas d&apos;enregistrement audio</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Caméra</td>
                    <td className="py-3 pr-4">Enregistrer une vidéo pendant une alerte</td>
                    <td className="py-3">Pas d&apos;enregistrement vidéo</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Contacts</td>
                    <td className="py-3 pr-4">Choisir vos proches dans votre carnet</td>
                    <td className="py-3">Ajout manuel possible</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Notifications</td>
                    <td className="py-3 pr-4">Recevoir les alertes de vos proches</td>
                    <td className="py-3">Vous ne seriez pas prévenu d&apos;une alerte</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4">Reconnaissance vocale</td>
                    <td className="py-3 pr-4">Déclencher l&apos;alerte par un mot</td>
                    <td className="py-3">Déclenchement manuel uniquement</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Chaque permission est facultative et révocable dans les réglages d&apos;iOS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Sécurité</h2>
            <p className="text-gray-600 leading-relaxed">
              Les échanges sont chiffrés en transit. L&apos;accès aux données est cloisonné au niveau de la base : chaque utilisateur ne peut lire que ses propres données et celles que quelqu&apos;un a explicitement choisi de partager avec lui. Les enregistrements sont dans un espace de stockage privé, non accessible publiquement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Mineurs</h2>
            <p className="text-gray-600 leading-relaxed">
              Safe Back est destinée aux personnes de {AGE_MINIMUM} ans et plus. En dessous de
              cet âge, l&apos;inscription requiert l&apos;accord d&apos;un titulaire de l&apos;autorité
              parentale, qui peut à tout moment demander l&apos;accès aux données du mineur,
              leur rectification ou leur suppression en écrivant à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Nous ne collectons pas sciemment de données concernant un enfant de moins de
              {" "}{AGE_MINIMUM} ans sans cet accord. Si nous apprenons qu&apos;un compte a été créé dans
              ces conditions, il est supprimé, ainsi que les données associées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Toute modification substantielle sera annoncée dans l&apos;application avant son entrée en vigueur.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SafeBack. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/cgu" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Conditions générales d&apos;utilisation
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
