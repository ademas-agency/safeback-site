"use client";

import { motion } from "framer-motion";
import { BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  {
    value: 87,
    suffix: "%",
    title: "Harcèlement de rue",
    description: "des femmes déclarent avoir été victimes de harcèlement de rue au moins une fois dans leur vie.",
    source: "Étude IFOP / Fondation Jean-Jaurès, 2018",
  },
  {
    value: 52,
    suffix: "%",
    title: "Évitement de lieux",
    description: "des Français déclarent éviter certains lieux ou certaines situations par sentiment d'insécurité.",
    source: "Enquête INSEE, Cadre de vie et sécurité",
  },
  {
    value: 72,
    suffix: "%",
    title: "Agressions nocturnes",
    description: "des agressions physiques ont lieu le soir ou la nuit, rendant les trajets de retour particulièrement à risque.",
    source: "Observatoire national de la délinquance (ONDRP)",
  },
  {
    value: 66,
    suffix: "%",
    title: "Femmes non sécurisées",
    description: "des femmes ne se sentent pas en sécurité dans les transports en commun le soir.",
    source: "Haut Conseil à l'égalité, 2015",
  },
  {
    value: 44,
    suffix: "%",
    title: "Victimes ne portent pas plainte",
    description: "des victimes d'agression ne portent pas plainte, souvent par peur ou par sentiment d'inutilité.",
    source: "Ministère de l'Intérieur",
  },
];

export default function StatistiquesPage() {
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
                <BarChart3 className="w-4 h-4 text-lavande" />
                <span className="text-lavande text-sm font-medium">Statistiques</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                L&apos;insécurité en <span className="gradient-text">chiffres</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                Des chiffres sourcés qui montrent pourquoi une solution comme SafeBack est nécessaire.
              </p>
            </motion.div>
            <div className="space-y-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card rounded-2xl p-8 md:p-10">
                    <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                            className="h-full rounded-full gradient-bg"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{stat.title}</h3>
                        <p className="text-white/60 mb-2">{stat.description}</p>
                        <p className="text-white/30 text-sm italic">Source : {stat.source}</p>
                      </div>
                    </div>
                  </div>
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
