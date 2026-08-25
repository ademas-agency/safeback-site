"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DownloadSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div style={{ perspective: 1200 }}>
          <motion.div
            className="relative group"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ z: 8 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute -inset-px rounded-[2rem]"
              animate={{
                boxShadow: [
                  "0 0 20px 4px rgba(47,107,255,0.1), 0 0 60px 8px rgba(124,58,237,0.05)",
                  "0 0 40px 8px rgba(124,58,237,0.15), 0 0 80px 16px rgba(47,107,255,0.08)",
                  "0 0 20px 4px rgba(47,107,255,0.1), 0 0 60px 8px rgba(124,58,237,0.05)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating border beam */}
            <div className="absolute -inset-[1px] rounded-[2rem] overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-[-100%] rounded-[2rem]"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(47,107,255,0.5) 80%, rgba(124,58,237,0.6) 85%, rgba(185,168,255,0.5) 90%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-gradient-to-br from-[#0e1a3a] via-[#141233] to-[#0e1a3a]" />
            </div>

            {/* Hover gradient border */}
            <div className="absolute -inset-[0.5px] rounded-[2rem] bg-gradient-to-r from-blue/5 via-white/8 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card content */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0e1a3a] via-[#141233] to-[#0e1a3a] border border-white/[0.08]">
              {/* Noise pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative text-center py-16 px-8">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Prêt à sortir l&apos;esprit léger ?
                </h2>
                <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                  Téléchargez SafeBack gratuitement et commencez à veiller sur ceux que vous aimez.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/telecharger"
                    className="flex items-center gap-3 bg-white text-nuit px-8 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </Link>
                  <Link
                    href="/telecharger"
                    className="flex items-center gap-3 bg-white text-nuit px-8 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.116 12l2.582-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/>
                    </svg>
                    Google Play
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
