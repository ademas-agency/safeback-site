"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  MapPin,
  AlertTriangle,
  Navigation,
  Users,
  Lock,
  Eye,
  Bell,
  Heart,
  GraduationCap,
  Briefcase,
  Moon,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";
import IPhonePro from "@/components/IPhonePro";
import TrajetCinematic from "@/components/TrajetCinematic";
import LieuxSursCinematic from "@/components/LieuxSursCinematic";
import AlerteCinematic from "@/components/AlerteCinematic";
import StatsBanner from "@/components/StatsBanner";
import PartenaireCarousel from "@/components/PartenaireCarousel";
import VideoBackground from "@/components/VideoBackground";
import NetworkBackground from "@/components/NetworkBackground";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 relative overflow-hidden">
        {/* ===== FOND GLOBAL SOMBRE + POINTS QUI SE RELIENT ===== */}
        <div className="absolute inset-0 bg-nuit" />
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/5 pointer-events-none" />

        {/* ===== CONTENU ===== */}
        <div className="relative z-10">

        {/* ========== HERO ========== */}
        {/* Hero moins haut sur mobile : la video s'y affiche en entier (16/9), il ne
            sert a rien de reserver toute la hauteur d'ecran pour du vide. */}
        <section className="relative min-h-[46vh] md:min-h-[62vh] lg:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-end overflow-hidden">
          {/* Fond vidéo, uniquement sur le hero */}
          <VideoBackground />
          <div className="w-full px-4 sm:px-6 lg:px-10 relative z-10 pb-5 pt-12">
            {/* Barre du bas : logo (gauche) · boutons (centre) · 100% gratuit (droite) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              // Empile sur mobile, 3 colonnes a partir de sm. En grid-cols-3 sur un
              // telephone, les trois blocs se battaient pour 130 px chacun : slogan
              // illisible, boutons superposes, « 100% gratuit » coupe.
              className="flex flex-col items-center gap-4 text-center w-full lg:grid lg:grid-cols-3 lg:items-center lg:gap-3 lg:text-left"
            >
              {/* Slogan à gauche */}
              <div className="flex justify-center lg:justify-start">
                <h1 className="text-sm lg:text-[13px] xl:text-sm font-bold leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
                  <span className="text-white">Sortez l&apos;esprit léger, </span>
                  <span className="gradient-text">veillez sur ceux que vous aimez</span>
                </h1>
              </div>

              {/* Boutons centrés sur la page */}
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/telecharger"
                  className="gradient-bg gradient-bg-hover px-4 py-2 rounded-lg text-white font-semibold text-xs text-center transition-all hover:shadow-xl hover:shadow-violet/30 hover:scale-105 flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  Télécharger l&apos;app
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/produit"
                  className="px-4 py-2 rounded-lg text-white font-semibold text-xs text-center border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  Découvrir l&apos;application
                </Link>
              </div>

              {/* 100% gratuit à droite */}
              <div className="flex justify-center lg:justify-end">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white whitespace-nowrap [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
                  100% gratuit
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== BANDEAU STATISTIQUES ========== */}
        <StatsBanner />
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Chiffres sourcés</p>
          <Link
            href="/statistiques"
            className="inline-flex items-center gap-1.5 text-lavande hover:text-white text-sm font-medium transition-colors"
          >
            Voir les statistiques
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ========== COMMENT CA FONCTIONNE ========== */}
        <div id="comment-ca-marche" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trois fonctionnalités pour votre sécurité
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              SafeBack vous offre les outils essentiels pour vous sentir en sécurité lors de vos sorties.
            </p>
          </div>

          {/* Étape 1 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20 mb-6">
                <span className="text-blue text-sm font-semibold">Retour accompagné</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Rentrez chez vous en toute <span className="gradient-text">sérénité</span>
              </h3>
              <p className="text-white/60 text-lg mb-6">
                Vous voulez informer vos proches de votre trajet ? Lancez un trajet et vos proches vous suivent en temps réel sur une carte. À chaque
                point d&apos;intérêt, ils sont informés. À votre arrivée, une notification confirme que
                tout va bien.
              </p>
              <ul className="space-y-3">
                {[
                  "Partage de position en temps réel",
                  "Notification d'arrivée automatique",
                  "Détection d'anomalie sur le trajet",
                  "Trajets favoris enregistrables",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-semibold text-base">
                    <CheckCircle className="w-5 h-5 text-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <IPhonePro animate={false}>
              <TrajetCinematic id="home" />
            </IPhonePro>
          </div>

          {/* Étape 2 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <IPhonePro animate={false}>
                <AlerteCinematic id="home" />
              </IPhonePro>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-6">
                <span className="text-violet text-sm font-semibold">Alerte d&apos;urgence</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Une alerte en <span className="gradient-text">un geste</span>
              </h3>
              <p className="text-white/60 text-lg mb-4">
                Vous ne vous sentez pas en sécurité ? Déclenchez une alerte immédiatement !
                Vos proches reçoivent votre position, un enregistrement audio et vidéo démarre
                automatiquement. Vous avez trois possibilités :
              </p>
              <ul className="space-y-3 mb-5">
                {[
                  "Cliquer sur le bouton alerte",
                  "Lancer un raccourci depuis votre téléphone",
                  "Prononcer un mot préalablement défini",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-semibold text-base">
                    <CheckCircle className="w-5 h-5 text-violet shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold mb-4">
                <span className="gradient-text">SafeBack : La seule application au monde</span>{" "}
                <span className="text-white">capable d&apos;activer une alarme rien qu&apos;en prononçant un mot.</span>
              </p>
            </motion.div>
          </div>

          {/* Étape 3 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavande/10 border border-lavande/20 mb-6">
                <span className="text-lavande text-sm font-semibold">Carte des lieux sûrs</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                La carte des lieux sûrs
              </h3>
              <p className="text-white/60 text-lg mb-6">
                Visualisez en un coup d&apos;œil les refuges à proximité : commerces partenaires,
                commissariats, pharmacies de garde. Trouvez rapidement un endroit où vous sentir en
                sécurité.
              </p>
              <ul className="space-y-3">
                {[
                  "Lieux sûrs géolocalisés autour de vous",
                  "Commerces partenaires identifiés",
                  "Mise à jour en temps réel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-semibold text-base">
                    <CheckCircle className="w-5 h-5 text-lavande shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <IPhonePro animate={false}>
              <LieuxSursCinematic />
            </IPhonePro>
          </div>
        </div>

        {/* ========== NOTRE MISSION ========== */}
        <div id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Notre <span className="gradient-text">mission</span>
              </h2>
              <p className="text-white/60 text-lg mb-4 leading-normal text-justify">
                SafeBack est né d&apos;un constat simple : <span className="text-white font-semibold">personne ne devrait avoir peur de rentrer
                chez soi.</span> Notre mission est de rendre chaque trajet plus serein, en connectant les
                personnes qui comptent les unes pour les autres.
              </p>
              <p className="text-white/60 text-lg leading-normal text-justify">
                Nous ne vendons pas une protection contre un danger. <span className="text-white font-semibold">Nous offrons la tranquillité
                d&apos;esprit.</span> Celle de savoir que quelqu&apos;un veille sur vous, discrètement, pour que vous
                puissiez sortir et vivre l&apos;esprit léger.
              </p>
            </div>

            <div className="relative">
              <img
                src="/mission.png"
                alt="Femme marchant sereinement en ville le soir"
                className="w-full rounded-[2rem] object-cover glow-blue"
              />
            </div>
          </div>
        </div>

        {/* ========== POUR QUI ========== */}
        <div id="pour-qui" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pour <span className="gradient-text">qui</span> ?
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              SafeBack s&apos;adresse à toutes les personnes qui veulent se sentir en sécurité.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Moon className="w-7 h-7" />,
                title: "Sortie nocturne",
                description: "Vous rentrez seul(e) après une soirée ? SafeBack veille sur vous.",
              },
              {
                icon: <GraduationCap className="w-7 h-7" />,
                title: "Étudiants",
                description:
                  "Vos parents savent que vous êtes bien rentré(e), sans avoir à vous appeler.",
              },
              {
                icon: <Briefcase className="w-7 h-7" />,
                title: "Professionnels",
                description:
                  "Vous travaillez tard ou en déplacement ? Vos proches sont rassurés.",
              },
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Parents",
                description:
                  "Suivez le retour de vos enfants et soyez alertés en cas de problème.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-lavande">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== CONFIANCE ========== */}
        <div id="confiance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Construit pour la <span className="gradient-text">confiance</span>
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Votre sécurité et votre vie privée sont au cœur de SafeBack.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Données chiffrées",
                description: "Toutes vos données sont chiffrées en transit et en stockage.",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Contrôle total",
                description: "Vous décidez qui voit votre position et quand.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Lien réciproque",
                description:
                  "Un contact ne voit votre position que si vous l'avez tous les deux accepté.",
              },
              {
                icon: <Bell className="w-6 h-6" />,
                title: "Aucune revente",
                description: "Vos données ne sont jamais vendues ni cédées à des tiers.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== PARTENAIRES ========== */}
        <div id="partenaires" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Devenir <span className="gradient-text">partenaire</span>
                </h2>
                <p className="text-white/60 text-lg mb-6 text-justify">
                  Vous êtes un commerce, un restaurant, un bar ou un lieu accueillant le public ?
                  Devenez un lieu sûr sur SafeBack et participez à la sécurité de votre quartier.
                </p>
                <p className="text-white font-semibold mb-8 text-justify">
                  En devenant partenaire, votre établissement apparaît sur la carte des lieux sûrs
                  à des milliers d&apos;utilisateurs. Vous montrez votre engagement pour la sécurité de tous.
                </p>
                <Link
                  href="/partenaires"
                  className="gradient-bg gradient-bg-hover px-8 py-3 rounded-full text-white font-semibold transition-all hover:shadow-lg hover:shadow-violet/20 inline-flex items-center gap-2"
                >
                  Devenir partenaire
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <PartenaireCarousel />
            </div>
        </div>

        {/* ========== TELECHARGER ========== */}
        <DownloadSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
