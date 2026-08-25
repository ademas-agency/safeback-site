"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

interface IPhoneProProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function IPhonePro({
  children,
  className = "",
  animate = true,
}: IPhoneProProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

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
    <div className={`flex justify-center ${className}`} style={{ perspective: 1200 }}>
      <motion.div
        className="relative"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={animate ? { opacity: 0, y: 50 } : undefined}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute -inset-16 z-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-blue/12 rounded-full blur-[80px]"
            animate={
              animate
                ? { opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }
                : undefined
            }
            transition={
              animate
                ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
          <motion.div
            className="absolute inset-6 bg-violet/10 rounded-full blur-[60px]"
            animate={
              animate
                ? { opacity: [0.3, 0.5, 0.3], scale: [1.05, 0.95, 1.05] }
                : undefined
            }
            transition={
              animate
                ? {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }
                : undefined
            }
          />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[65%] h-6 bg-violet/20 rounded-full blur-2xl" />
        <motion.div
          className="relative z-10"
          animate={animate ? { y: [0, -10, 0] } : undefined}
          transition={
            animate
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <div className="relative" style={{ width: 280, height: 580 }}>
            <div
              className="absolute inset-0 rounded-[55px]"
              style={{
                background:
                  "linear-gradient(145deg, #44445a 0%, #2a2a3e 20%, #1e1e30 50%, #2a2a3e 80%, #44445a 100%)",
              }}
            >
              <div
                className="absolute top-0 left-[15%] right-[15%] h-[1px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              <div
                className="absolute bottom-0 left-[15%] right-[15%] h-[1px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />
            </div>
            <div
              className="absolute rounded-[53px]"
              style={{
                top: 2,
                left: 2,
                right: 2,
                bottom: 2,
                background:
                  "linear-gradient(160deg, #111118 0%, #08080f 50%, #111118 100%)",
              }}
            >
              <div
                className="absolute rounded-[48px] overflow-hidden"
                style={{ top: 4, left: 4, right: 4, bottom: 4 }}
              >
                <div className="absolute inset-0 bg-[#0B1230]" />
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30">
                  <div className="relative">
                    <div
                      className="bg-black rounded-full"
                      style={{ width: 100, height: 30 }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        top: 3,
                        left: 10,
                        width: 18,
                        height: 3,
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                      }}
                    />
                    <div
                      className="absolute rounded-full bg-[#1a1a2e]"
                      style={{ top: 9, right: 16, width: 10, height: 10 }}
                    >
                      <div
                        className="absolute rounded-full bg-[#0a0a15]"
                        style={{ top: 2, left: 2, width: 6, height: 6 }}
                      />
                      <div
                        className="absolute rounded-full bg-white/[0.04]"
                        style={{ top: 1.5, left: 2.5, width: 3, height: 2 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative z-10 w-full h-full">{children}</div>
                <div
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 15%, transparent 35%)",
                  }}
                />
              </div>
            </div>
            <div
              className="absolute -right-[2.5px] rounded-r-[1.5px]"
              style={{
                top: 160,
                width: 3,
                height: 58,
                background:
                  "linear-gradient(to bottom, #4a4a5e, #2a2a3e, #4a4a5e)",
              }}
            />
            <div
              className="absolute -left-[2.5px] rounded-l-[1.5px]"
              style={{
                top: 138,
                width: 3,
                height: 30,
                background:
                  "linear-gradient(to bottom, #4a4a5e, #2a2a3e, #4a4a5e)",
              }}
            />
            <div
              className="absolute -left-[2.5px] rounded-l-[1.5px]"
              style={{
                top: 180,
                width: 3,
                height: 30,
                background:
                  "linear-gradient(to bottom, #4a4a5e, #2a2a3e, #4a4a5e)",
              }}
            />
            <div
              className="absolute -left-[2.5px] rounded-l-[1.5px]"
              style={{
                top: 106,
                width: 3,
                height: 18,
                background:
                  "linear-gradient(to bottom, #4a4a5e, #2a2a3e, #4a4a5e)",
              }}
            />
            <div className="absolute inset-0 rounded-[55px] border border-white/[0.06] pointer-events-none" />
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                top: 40,
                left: 2,
                width: 3,
                height: 180,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
                filter: "blur(1px)",
              }}
            />
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                top: 200,
                right: 2,
                width: 2,
                height: 120,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)",
                filter: "blur(1px)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
