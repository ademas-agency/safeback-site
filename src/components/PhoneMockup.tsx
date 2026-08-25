"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`animate-float ${className}`}
    >
      <div className="phone-mockup w-[260px] h-[520px] mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-nuit-light flex items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
