"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Navigation,
  AlertTriangle,
  MapPin,
  CheckCircle,
  ArrowRight,
  Shield,
  Star,
  Smartphone,
  UserPlus,
  Bell,
  Lock,
  Eye,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";
import IPhonePro from "@/components/IPhonePro";
import TrajetCinematic from "@/components/TrajetCinematic";
import LieuxSursCinematic from "@/components/LieuxSursCinematic";
import AlerteCinematic from "@/components/AlerteCinematic";
import GlowCard from "@/components/GlowCard";

export default function ProduitPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 relative overflow-hidden">
        {/* ===== FOND GRADIENT ANIME BLEU MARINE ===== */}
        <div className="absolute inset-0 bg-nuit" />

        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue/10 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-5%] w-[55%] h-[55%] rounded-full bg-blue/8 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, -80, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-[35%] h-[35%] rounded-full bg-[#0d2855]/30 blur-[100px]"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue/6 blur-[80px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ===== CONTENU ===== */}
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-28">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Shield className="w-4 h-4 text-lavande" />
              <span className="text-lavande text-sm font-medium">L&apos;Application</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Découvrez <span className="gradient-text">SafeBack</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
              Une application pensée pour votre sécurité, simple à utiliser, toujours avec vous.
            </p>
          </motion.div>
          {/* Feature 1 - Retour accompagné */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20 mb-6">
                <Navigation className="w-4 h-4 text-blue" />
                <span className="text-blue text-sm font-semibold">Retour accompagné</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Rentrez chez vous en toute <span className="gradient-text">sérénité</span>
              </h2>
              <p className="text-white/60 text-lg mb-6">
                Vous voulez informer vos proches de votre trajet ? Lancez un trajet et vos proches vous suivent en temps réel sur une carte.
                À chaque point d&apos;intérêt, ils sont informés. À votre arrivée, une notification
                confirme que tout va bien.
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
            </div>
            <IPhonePro animate={false}>
              <TrajetCinematic id="produit" />
            </IPhonePro>
          </div>

          {/* Feature 2 - Alerte */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <IPhonePro animate={false}>
                <AlerteCinematic id="produit" />
              </IPhonePro>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-6">
                <AlertTriangle className="w-4 h-4 text-violet" />
                <span className="text-violet text-sm font-semibold">Alerte d&apos;urgence</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Une alerte en <span className="gradient-text">un geste</span>
              </h2>
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

          {/* Feature 3 - Carte */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavande/10 border border-lavande/20 mb-6">
                <MapPin className="w-4 h-4 text-lavande" />
                <span className="text-lavande text-sm font-semibold">Carte des lieux sûrs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trouvez un <span className="gradient-text">refuge</span> à proximité
              </h2>
              <p className="text-white/60 text-lg mb-6">
                Visualisez en un coup d&apos;œil les refuges autour de vous.
                Commerces partenaires, commissariats, pharmacies de garde.
              </p>
              <ul className="space-y-3">
                {[
                  "Lieux sûrs géolocalisés",
                  "Commerces partenaires identifiés",
                  "Mise à jour en temps réel",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white font-semibold text-base">
                    <CheckCircle className="w-5 h-5 text-lavande shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <IPhonePro animate={false}>
              <LieuxSursCinematic />
            </IPhonePro>
          </div>
        </div>

        {/* ========== COMMENT FONCTIONNE SAFEBACK ========== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Comment fonctionne <span className="gradient-text">SafeBack</span> ?
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Un dispositif simple, efficace, conçu pour que vous puissiez sortir l&apos;esprit léger.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue via-violet to-lavande hidden md:block" />

              <div className="space-y-12">
                {[
                  {
                    icon: <Smartphone className="w-6 h-6" />,
                    title: "Téléchargez SafeBack",
                    description: "Disponible gratuitement sur l'App Store et Google Play. L'inscription se fait en quelques secondes avec votre numéro de téléphone.",
                  },
                  {
                    icon: <UserPlus className="w-6 h-6" />,
                    title: "Ajoutez vos proches",
                    description: "Invitez vos contacts de confiance. Le lien est actif uniquement quand les deux personnes se sont ajoutées mutuellement.",
                  },
                  {
                    icon: <Navigation className="w-6 h-6" />,
                    title: "Lancez un trajet",
                    description: "Quand vous sortez, lancez un trajet accompagné. Vos proches vous suivent en temps réel sur une carte jusqu'à votre arrivée.",
                  },
                  {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "En cas de problème",
                    description: "Un appui long sur le bouton SOS, un geste, ou un mot d'alerte : vos proches sont immédiatement prévenus avec votre position.",
                  },
                  {
                    icon: <Bell className="w-6 h-6" />,
                    title: "Vos proches sont alertés",
                    description: "Notification instantanée avec votre position en temps réel. Un enregistrement audio et vidéo démarre automatiquement.",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Trouvez un refuge",
                    description: "La carte des lieux sûrs vous montre les refuges à proximité : commerces partenaires, commissariats, pharmacies de garde.",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 relative z-10">
                      {step.icon}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== CONFIDENTIALITÉ ========== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Votre <span className="gradient-text">confidentialité</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              SafeBack est conçu pour protéger votre vie privée à chaque étape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Chiffrement",
                description: "Toutes les données sont chiffrées en transit.",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Contrôle",
                description: "Vous décidez qui voit votre position et quand.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Réciprocité",
                description: "Partage uniquement si les deux personnes l'acceptent.",
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

        {/* Abonnements */}
        <div id="abonnements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos <span className="gradient-text">abonnements</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              SafeBack est gratuit. L&apos;abonnement débloque des fonctionnalités avancées.
            </p>
          </div>

          {/* Deux formules : grille a deux colonnes, centree. En md:grid-cols-3
             les cartes restaient collees a gauche avec un trou a droite. */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: "Gratuit",
                price: "0€",
                period: "",
                features: [
                  "Alerte d'urgence",
                  "Partage de position",
                  "Trajet accompagné",
                  "3 contacts de confiance",
                  "Enregistrement local (7 jours)",
                ],
                highlight: false,
              },
              {
                name: "Premium",
                price: "4,99€",
                period: "/mois",
                features: [
                  "Tout le plan Gratuit",
                  "Contacts illimités",
                  "Trajets favoris illimités",
                  "Sauvegarde cloud des enregistrements",
                  "Conservation pendant l'abonnement",
                ],
                highlight: true,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <GlowCard
                  className={`rounded-2xl p-8 ${
                    plan.highlight
                      ? "gradient-bg shadow-xl shadow-violet/20"
                      : "bg-nuit/70 backdrop-blur-xl border border-white/[0.06] shadow-2xl"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded-full z-10">
                      <span className="text-nuit text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" /> Populaire
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-white/60 text-sm">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckCircle className="w-4 h-4 text-white/60 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/telecharger"
                    className={`block w-full py-3 rounded-xl text-center font-semibold transition-all hover:scale-105 ${
                      plan.highlight
                        ? "bg-white text-nuit hover:bg-white/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Télécharger
                  </Link>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        <DownloadSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
