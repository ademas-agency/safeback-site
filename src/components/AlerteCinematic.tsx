"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapBackground from "@/components/MapBackground";
import { TopBar, TabBar } from "@/components/AppShell";

export default function AlerteCinematic({ id = "" }: { id?: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // phase 0 : écran d'accueil (carte)
    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 2200);
      return () => clearTimeout(t);
    }
    // phase 1 : écran d'alerte au repos
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1300);
      return () => clearTimeout(t);
    }
    // phase 2 : le bouton d'alerte s'allume (l'anneau se remplit)
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 2200);
      return () => clearTimeout(t);
    }
    // phase 3 : notification "alerte envoyée"
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 2800);
      return () => clearTimeout(t);
    }
    // phase 4 : écran éteint 1,5 s
    if (phase === 4) {
      const t = setTimeout(() => setPhase(0), 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Écran éteint
  if (phase === 4) {
    return <div className="w-full h-full bg-black" />;
  }

  // Écran d'accueil avec la carte
  if (phase === 0) {
    return (
      <motion.div
        key="home"
        className="w-full h-full flex flex-col bg-[#060910]"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-[48px] shrink-0" />
        <div className="flex-1 relative overflow-hidden">
          <TopBar />
          <MapBackground />
          <div className="absolute bottom-3 right-3 z-20 w-[32px] h-[32px] rounded-full bg-[#0B1230]/80 backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6">
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
          </div>
        </div>
        <TabBar active="carte" />
      </motion.div>
    );
  }

  // Écran d'alerte (phases 1 → 3)
  const active = phase >= 2;
  const gradId = `sosGrad${id}`;

  return (
    <motion.div
      key="alerte"
      className="w-full h-full flex flex-col bg-[#0B1230]"
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-[48px] shrink-0" />
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
        <TopBar />

        {/* Halo violet derrière le bouton */}
        <motion.div
          className="absolute w-52 h-52 rounded-full bg-violet/30 blur-[55px]"
          animate={{ opacity: active ? 0.95 : 0.3, scale: active ? 1.1 : 0.85 }}
          transition={{ duration: 0.6 }}
        />

        <p className="text-white/60 text-xs mb-6 font-medium relative z-10">
          {phase === 1 ? "Appuyez longuement" : phase === 2 ? "Envoi de l'alerte…" : "Alerte active"}
        </p>

        <div className="relative z-10">
          <div className="w-36 h-36 rounded-full border-4 border-white/10 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2F6BFF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="72"
                cy="72"
                r="68"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="427"
                initial={false}
                animate={{ strokeDashoffset: active ? 0 : 427 }}
                transition={{ duration: phase === 2 ? 2 : 0.4, ease: "easeInOut" }}
              />
            </svg>
            <motion.div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              animate={{
                backgroundColor: active ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.2)",
                scale: active ? [1, 1.06, 1] : 1,
              }}
              transition={{ duration: active ? 1 : 0.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
            >
              <span className={`font-black text-3xl ${active ? "text-white" : "text-lavande"}`}>SOS</span>
            </motion.div>
          </div>
        </div>

        {/* Notification "alerte envoyée" */}
        {phase === 3 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="relative bg-[#0B1230] border border-white/10 rounded-2xl px-4 py-5 mx-3 flex flex-col items-center shadow-2xl shadow-violet/20"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <p className="text-white text-[12px] font-bold mb-1 text-center whitespace-nowrap">Alerte envoyée à vos proches !</p>
              <p className="text-white/40 text-[9px] text-center">Position et enregistrement transmis</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <TabBar active="alerte" />
    </motion.div>
  );
}
