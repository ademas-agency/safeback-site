"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapBackground, { ROUTE_PATH } from "@/components/MapBackground";
import { TopBar, TabBar } from "@/components/AppShell";

const ROUTE_LENGTH = 420;

export default function TrajetCinematic({ id = "" }: { id?: string }) {
  const [phase, setPhase] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const LINE_DUR = 4;

  useEffect(() => {
    setShowNotif(false);

    if (phase === 0) {
      const t = setTimeout(() => setPhase(1), 1800);
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const tNotif = setTimeout(() => setShowNotif(true), LINE_DUR * 1000);
      const tNext = setTimeout(() => setPhase(2), LINE_DUR * 1000 + 3000);
      return () => { clearTimeout(tNotif); clearTimeout(tNext); };
    }
    if (phase === 2) {
      const t = setTimeout(() => setPhase(0), 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const gradId = `traceGrad${id}`;
  const glowId = `glow${id}`;

  if (phase === 2) {
    return <div className="w-full h-full bg-black" />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#060910]">
      <div className="h-[48px] shrink-0" />
      <div className="flex-1 relative overflow-hidden">
        <TopBar />
        <MapBackground showRoute />

        {phase === 1 && (
          <motion.svg viewBox="0 0 264 400" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid slice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2F6BFF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={ROUTE_PATH}
              stroke={`url(#${gradId})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              strokeDasharray={ROUTE_LENGTH}
              strokeDashoffset={ROUTE_LENGTH}
              opacity={showNotif ? 0.6 : 1}
            >
              <animate
                attributeName="stroke-dashoffset"
                from={ROUTE_LENGTH}
                to="0"
                dur={`${LINE_DUR}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1"
                keyTimes="0;1"
              />
            </path>
          </motion.svg>
        )}

        <div className="absolute bottom-3 right-3 z-20 w-[32px] h-[32px] rounded-full bg-[#0B1230]/80 backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
        </div>

        {phase === 1 && showNotif && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="relative bg-[#0B1230] border border-white/10 rounded-2xl px-5 py-5 flex flex-col items-center shadow-2xl shadow-violet/20"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <p className="text-white text-[12px] font-bold mb-1">Vous êtes bien arrivé(e) !</p>
              <p className="text-white/40 text-[9px]">Vos proches ont été notifiés</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="bg-[#0B1230] border-t border-white/[0.06] px-3 pt-1.5 shrink-0">
        <div className="w-8 h-[3px] bg-white/20 rounded-full mx-auto mb-2" />
        {phase === 0 && (
          <motion.div
            className="flex items-center gap-2 mb-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[28px] h-[28px] rounded-full bg-violet flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L4 10h2v9h5v-5h2v5h5v-9h2L12 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-[10px] font-semibold leading-tight">Vers Domicile</p>
              <p className="text-white/40 text-[8px]">12 min à pied</p>
            </div>
            <motion.div
              className="bg-gradient-to-r from-blue to-violet rounded-full px-3 py-1.5 cursor-pointer"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <span className="text-white text-[9px] font-semibold">Lancer</span>
            </motion.div>
          </motion.div>
        )}
        {phase === 1 && !showNotif && (
          <motion.div
            className="flex items-center gap-2 mb-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[28px] h-[28px] rounded-full bg-violet flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L4 10h2v9h5v-5h2v5h5v-9h2L12 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-[10px] font-semibold leading-tight">Trajet en cours</p>
              <p className="text-white/40 text-[8px]">Domicile • 12 min</p>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-blue/20 flex items-center justify-center">
              <span className="text-blue text-[8px] font-bold leading-none">LIVE</span>
            </div>
          </motion.div>
        )}
        {phase === 1 && showNotif && (
          <motion.div
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L15 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-[10px] font-semibold leading-tight">Arrivé(e) à destination</p>
              <p className="text-white/40 text-[8px]">Domicile • Trajet terminé</p>
            </div>
          </motion.div>
        )}
      </div>
      <TabBar />
    </div>
  );
}
