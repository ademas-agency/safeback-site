"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Star, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";
import GlowCard from "@/components/GlowCard";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "L'essentiel pour votre sécurité, sans frais.",
    features: [
      "Alerte d'urgence",
      "Partage de position",
      "Trajet accompagné",
      "3 contacts de confiance",
      "Enregistrement local (7 jours)",
      "Carte des lieux sûrs",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "4,99€",
    period: "/mois",
    description: "Pour ceux qui veulent aller plus loin dans leur sécurité.",
    features: [
      "Tout le plan Gratuit",
      "Contacts de confiance illimités",
      "Trajets favoris illimités",
      "Sauvegarde cloud des enregistrements",
      "Conservation pendant la durée de l'abonnement",
      "Accès multi-appareils",
    ],
    highlight: true,
  },
];

export default function OffresPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 relative overflow-hidden">
        {/* ===== FOND GRADIENT ANIME ===== */}
        <div className="absolute inset-0 bg-nuit" />

        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue/12 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-5%] w-[55%] h-[55%] rounded-full bg-violet/15 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, -80, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-[35%] h-[35%] rounded-full bg-lavande/8 blur-[100px]"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue/8 blur-[80px]"
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
                <Tag className="w-4 h-4 text-lavande" />
                <span className="text-lavande text-sm font-medium">Nos Offres</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Choisissez votre <span className="gradient-text">formule</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                SafeBack est gratuit. Passez à Premium pour des fonctionnalités avancées.
              </p>
            </motion.div>
            <div className="max-w-lg mx-auto space-y-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
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
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                        <p className="text-white/60 text-sm mt-1">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        {plan.period && <span className="text-white/60 text-sm">{plan.period}</span>}
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
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
