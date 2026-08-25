"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, Shield, Zap, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhonePro from "@/components/IPhonePro";
import MapBackground from "@/components/MapBackground";

/* ──────────────────────────────────────────────
   PHASE 0 — Téléchargement
   ────────────────────────────────────────────── */
function DownloadPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#0B1230]"
    >
      <div className="w-[72px] h-[72px] rounded-[16px] bg-gradient-to-br from-blue to-violet flex items-center justify-center shadow-lg shadow-violet/20 mb-5">
        <img
          src="/logo.png"
          alt="SafeBack"
          className="w-12 h-12 object-contain"
        />
      </div>
      <p className="text-white text-[13px] font-semibold mb-1">SafeBack</p>
      <p className="text-white/30 text-[10px] mb-4">Téléchargement...</p>
      <div className="w-36 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue to-violet"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   PHASE 1 — Splash logo
   ────────────────────────────────────────────── */
function SplashPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#0B1230] relative overflow-hidden"
    >
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue/25 to-violet/25 blur-[50px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.img
        src="/logo.png"
        alt="SafeBack"
        className="w-24 h-24 object-contain relative z-10 mb-3"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.35 }}
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white font-bold text-lg relative z-10"
      >
        Safe<span className="text-lavande">Back</span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
        className="text-white text-[10px] mt-1 relative z-10"
      >
        Sortez l&apos;esprit léger
      </motion.p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   PHASE 2 — Écran principal de l'app
   ────────────────────────────────────────────── */
const friends = [
  { i: "M", name: "Malone", c: "#10B981" },
  { i: "J", name: "Jules", c: "#14B8A6" },
  { i: "F", name: "Felix", c: "#60A5FA" },
  { i: "J", name: "Julien", c: "#F59E0B" },
  { i: "L", name: "Liam", c: "#EC4899" },
];

function AppScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col bg-[#060910]"
    >
      {/* Espace Dynamic Island */}
      <div className="h-[48px] shrink-0" />

      {/* Zone carte */}
      <div className="flex-1 relative overflow-hidden">
        {/* Barre du haut */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" fill="#2F6BFF" />
              <path
                d="M7.5 12.5l3 3 6-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-[10px] font-extrabold tracking-wide">
              <span className="text-white">SAFE</span>
              <span className="text-lavande">BACK</span>
            </span>
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-blue flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Carte partagée (identique à tous les téléphones, personnages inclus) */}
        <MapBackground />

        {/* Bouton localisation */}
        <div className="absolute bottom-3 right-3 z-20 w-[32px] h-[32px] rounded-full bg-[#0B1230]/80 backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-[#0B1230] border-t border-white/[0.06] px-3 pt-1.5 shrink-0">
        {/* Handle */}
        <div className="w-8 h-[3px] bg-white/20 rounded-full mx-auto mb-2" />

        {/* Ligne amis */}
        <div className="flex items-center gap-[4px] mb-2">
          {friends.map((f) => (
            <div
              key={f.name}
              className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
              style={{ backgroundColor: f.c }}
            >
              {f.i}
            </div>
          ))}
          <span className="text-white/50 text-[10px] font-medium ml-1 whitespace-nowrap">
            5 amis
          </span>
          <div className="ml-auto w-[24px] h-[24px] rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>
        </div>

        {/* Bouton trajet */}
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-full px-3.5 py-2 mb-1.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#3B82F6"
          >
            <circle cx="12" cy="4" r="2" />
            <path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 7 6 9.24 6 11.99V14h2v-2.01c0-1.79 1.21-3.23 2.83-3.72L9 21h2.01l1.49-6.49L14 17v4h2v-5.49l-2.26-3.46c.67.16 1.38.46 1.97 1.05L17.13 14 19 12.12l-3.11-4.01z" />
          </svg>
          <span className="text-white text-[11px] font-medium flex-1">
            Démarrer un trajet
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center justify-around px-6 pb-5 pt-1 bg-[#0B1230] border-t border-white/[0.04] shrink-0">
        <div className="flex flex-col items-center gap-[2px]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span className="text-blue text-[8px] font-semibold">Carte</span>
        </div>
        <div className="flex flex-col items-center gap-[2px]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-white/30 text-[8px]">Alerte</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Écran animé (cinématique)
   ────────────────────────────────────────────── */
function BlackScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-black"
    />
  );
}

function AnimatedScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const durations = [2200, 1800, 5000, 1500];
    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % 4);
    }, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 0 && <DownloadPhase key="dl" />}
        {phase === 1 && <SplashPhase key="sp" />}
        {phase === 2 && <AppScreen key="app" />}
        {phase === 3 && <BlackScreen key="off" />}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Badges confiance
   ────────────────────────────────────────────── */
const trustBadges = [
  { icon: Shield, label: "Données chiffrées" },
  { icon: Zap, label: "Gratuit" },
  { icon: Lock, label: "Sans pub" },
];

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */
export default function TelechargerPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Fond animé */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[500px] h-[500px] bg-blue/8 rounded-full blur-[120px]"
              style={{ top: "10%", left: "10%" }}
              animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] bg-violet/8 rounded-full blur-[100px]"
              style={{ bottom: "10%", right: "15%" }}
              animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] bg-lavande/5 rounded-full blur-[80px]"
              style={{ top: "50%", left: "50%" }}
              animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </div>

          {/* Texture bruit */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Colonne texte */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                  <Download className="w-4 h-4 text-lavande" />
                  <span className="text-lavande text-sm font-medium">
                    Disponible sur iOS & Android
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                  <span className="text-white">Téléchargez</span>
                  <br />
                  <span className="gradient-text">SafeBack</span>
                </h1>

                <p className="text-white/50 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                  Rejoignez des milliers d&apos;utilisateurs qui sortent
                  l&apos;esprit léger. Gratuit, sans pub, vos données restent
                  les vôtres.
                </p>

                {/* Boutons stores */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-white text-nuit px-7 py-3.5 rounded-2xl font-semibold transition-shadow hover:shadow-[0_8px_30px_rgba(47,107,255,0.2)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[10px] opacity-50 leading-tight">
                        Télécharger sur
                      </p>
                      <p className="text-[17px] font-bold leading-tight">
                        App Store
                      </p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-white text-nuit px-7 py-3.5 rounded-2xl font-semibold transition-shadow hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="currentColor"
                    >
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.116 12l2.582-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[10px] opacity-50 leading-tight">
                        Disponible sur
                      </p>
                      <p className="text-[17px] font-bold leading-tight">
                        Google Play
                      </p>
                    </div>
                  </motion.a>
                </div>

                {/* Badges de confiance */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {trustBadges.map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.06]"
                    >
                      <badge.icon className="w-3.5 h-3.5 text-lavande" />
                      <span className="text-white/50 text-xs font-medium">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <p className="text-white/25 text-xs leading-relaxed">
                  En téléchargeant SafeBack, vous acceptez nos{" "}
                  <Link
                    href="/cgu"
                    className="text-lavande/60 hover:text-lavande transition-colors underline"
                  >
                    conditions générales d&apos;utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link
                    href="/confidentialite"
                    className="text-lavande/60 hover:text-lavande transition-colors underline"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </motion.div>

              {/* Colonne iPhone */}
              <div className="flex justify-center order-1 lg:order-2">
                <IPhonePro>
                  <AnimatedScreen />
                </IPhonePro>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
