"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
    <div style={{ perspective: 1200 }}>
      <motion.div
        className="relative group"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 8 }}
      >
        <motion.div
          className="absolute -inset-px rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 15px 2px rgba(47,107,255,0.05)",
              "0 0 30px 5px rgba(124,58,237,0.1)",
              "0 0 15px 2px rgba(47,107,255,0.05)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute -inset-px rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px]"
            animate={{ left: ["-40%", "100%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/60 to-transparent blur-[1px]"
            animate={{ top: ["-40%", "100%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 0.75 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px]"
            animate={{ right: ["-40%", "100%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 1.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/60 to-transparent blur-[1px]"
            animate={{ bottom: ["-40%", "100%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 2.25 }}
          />

          <motion.div
            className="absolute top-0 left-0 h-[6px] w-[6px] rounded-full bg-blue/50 blur-[2px]"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute top-0 right-0 h-[6px] w-[6px] rounded-full bg-violet/50 blur-[2px]"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[6px] w-[6px] rounded-full bg-lavande/50 blur-[2px]"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatType: "mirror", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[6px] w-[6px] rounded-full bg-blue/50 blur-[2px]"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: 1.5 }}
          />
        </div>

        <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-blue/5 via-white/8 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className={`relative overflow-hidden ${className}`}>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
