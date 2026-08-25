"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MapBackground from "@/components/MapBackground";
import { TopBar, TabBar } from "@/components/AppShell";

/* Lieux placés hors de la Seine (y≈260-292) et à proximité des routes */
const LIEUX = [
  { x: 66, y: 138, label: "Café" },
  { x: 202, y: 150, label: "Bar" },
  { x: 202, y: 214, label: "Librairie" },
  { x: 112, y: 336, label: "Pharmacie" },
  { x: 66, y: 368, label: "Boulangerie" },
];

function LieuMarker({ x, y, active, label }: { x: number; y: number; active: boolean; label: string }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={active ? 18 : 10}
        fill="#7C3AED"
        opacity={active ? 0.26 : 0.12}
        style={{ transition: "r 0.4s ease, opacity 0.4s ease" }}
      />
      <circle
        cx={x}
        cy={y}
        r={active ? 12 : 6}
        fill="#B9A8FF"
        style={{ transition: "r 0.4s ease" }}
      />
      {active && (
        <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <rect x={x - 24} y={y - 30} width="48" height="16" rx="8" fill="#7C3AED" />
          <text x={x} y={y - 19} textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui">{label}</text>
        </motion.g>
      )}
    </g>
  );
}

export default function LieuxSursCinematic() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % LIEUX.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#060910]">
      <div className="h-[48px] shrink-0" />
      <div className="flex-1 relative overflow-hidden">
        <TopBar />
        <MapBackground />
        <svg viewBox="0 0 264 400" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid slice">
          {LIEUX.map((lieu, i) => (
            <LieuMarker key={i} x={lieu.x} y={lieu.y} active={i === activeIdx} label={lieu.label} />
          ))}
        </svg>
        <div className="absolute bottom-3 right-3 z-20 w-[32px] h-[32px] rounded-full bg-[#0B1230]/80 backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
        </div>
      </div>
      <div className="bg-[#0B1230] border-t border-white/[0.06] px-3 pt-1.5 shrink-0">
        <div className="w-8 h-[3px] bg-white/20 rounded-full mx-auto mb-2" />
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-[28px] h-[28px] rounded-full bg-lavande flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white text-[10px] font-semibold leading-tight">Lieux sûrs à proximité</p>
            <p className="text-white/40 text-[8px]">{LIEUX.length} établissements</p>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-lavande/20 flex items-center justify-center">
            <span className="text-lavande text-[8px] font-bold leading-none">CARTE</span>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}
