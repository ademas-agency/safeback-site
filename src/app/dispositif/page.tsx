"use client";

import { motion } from "framer-motion";
import {
  Shield,
  UserPlus,
  Navigation,
  Bell,
  MapPin,
  AlertTriangle,
  Lock,
  Eye,
  Smartphone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";
import SectionWrapper from "@/components/SectionWrapper";

const steps = [
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
];

export default function DispositifPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet/10 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Shield className="w-4 h-4 text-lavande" />
                <span className="text-lavande text-sm font-medium">Le Dispositif</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Comment fonctionne <span className="gradient-text">SafeBack</span> ?
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                Un dispositif simple, efficace, conçu pour que vous puissiez sortir l&apos;esprit léger.
              </p>
            </motion.div>
          </div>
        </section>

        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue via-violet to-lavande hidden md:block" />

              <div className="space-y-12">
                {steps.map((step, i) => (
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
        </SectionWrapper>

        <SectionWrapper dark>
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
        </SectionWrapper>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
