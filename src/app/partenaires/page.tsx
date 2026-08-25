"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Send,
  CheckCircle,
  Building2,
  Layers,
  User,
  Mail,
  MapPin,
  MessageSquare,
  Eye,
  Heart,
  Users,
  Handshake,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PartenairesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Envoi REEL. Ce bloc simulait un succes sans rien transmettre : un etablissement
  // qui remplissait ce formulaire se croyait recu, et personne ne recevait rien.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sujet: "Demande de partenariat" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "L'envoi a échoué. Réessayez.");
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Réseau de points et lignes animé
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const count = window.innerWidth < 768 ? 30 : 60;
    const maxDist = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(185, 168, 255, 0.4)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(47, 107, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const inputClass = (name: string) =>
    `w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-300 ${focusedInput === name ? "border-white/20 bg-white/[0.08]" : ""}`;

  const iconClass = (name: string) =>
    `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${focusedInput === name ? "text-lavande" : "text-white/30"}`;

  const advantages = [
    {
      icon: <Eye className="w-3.5 h-3.5" />,
      label: "Visibilité",
      bg: "bg-blue/10",
      border: "border-blue/20",
      text: "text-blue",
    },
    {
      icon: <Heart className="w-3.5 h-3.5" />,
      label: "Engagement",
      bg: "bg-violet/10",
      border: "border-violet/20",
      text: "text-violet",
    },
    {
      icon: <Users className="w-3.5 h-3.5" />,
      label: "Communauté",
      bg: "bg-lavande/10",
      border: "border-lavande/20",
      text: "text-lavande",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 min-h-screen relative">
        {/* ===== FOND RÉSEAU ANIMÉ ===== */}
        <div className="absolute inset-0 bg-nuit" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/5 pointer-events-none" />

        {/* ===== CONTENU ===== */}
        <div className="relative z-10 flex flex-col items-center px-4 py-6 md:py-10">
          {/* En-tête compact */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-5"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden mb-3"
            >
              <Handshake className="w-6 h-6 text-lavande" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-2"
            >
              Devenez <span className="gradient-text">partenaire</span> !
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-sm max-w-md mx-auto"
            >
              Rejoignez le réseau SafeBack et montrez votre engagement pour la
              sécurité de votre quartier !
            </motion.p>
          </motion.div>

          {/* Badges avantages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center mb-6"
          >
            {advantages.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${badge.bg} border ${badge.border} cursor-default`}
              >
                <span className={badge.text}>{badge.icon}</span>
                <span className={`${badge.text} text-xs font-medium`}>
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Carte formulaire glass 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-lg mb-12"
            style={{ perspective: 1500 }}
          >
            <motion.div
              className="relative"
              style={{ rotateX, rotateY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ z: 8 }}
            >
              <div className="relative group">
                {/* Glow pulsé */}
                <motion.div
                  className="absolute -inset-px rounded-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 15px 2px rgba(47,107,255,0.05)",
                      "0 0 30px 5px rgba(124,58,237,0.1)",
                      "0 0 15px 2px rgba(47,107,255,0.05)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Light beams */}
                <div className="absolute -inset-px rounded-2xl overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px]"
                    animate={{ left: ["-40%", "100%"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/60 to-transparent blur-[1px]"
                    animate={{ top: ["-40%", "100%"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      delay: 0.75,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px]"
                    animate={{ right: ["-40%", "100%"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      delay: 1.5,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/60 to-transparent blur-[1px]"
                    animate={{ bottom: ["-40%", "100%"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      delay: 2.25,
                    }}
                  />

                  {/* Lueurs aux coins */}
                  <motion.div
                    className="absolute top-0 left-0 h-[6px] w-[6px] rounded-full bg-blue/50 blur-[2px]"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 h-[6px] w-[6px] rounded-full bg-violet/50 blur-[2px]"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 h-[6px] w-[6px] rounded-full bg-lavande/50 blur-[2px]"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[6px] w-[6px] rounded-full bg-blue/50 blur-[2px]"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 1.5,
                    }}
                  />
                </div>

                {/* Bordure glow hover */}
                <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-blue/5 via-white/8 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Carte glass */}
                <div className="relative bg-nuit/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/[0.06] shadow-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center relative"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.6 }}
                          className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Demande envoyée !
                        </h3>
                        <p className="text-white/50 text-sm">
                          Nous avons bien reçu votre demande de partenariat.
                          Notre équipe vous contactera dans les plus brefs
                          délais.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div key="form" className="relative">
                        <form onSubmit={handleSubmit} className="space-y-3">
                          {/* Nom établissement + Type */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.01 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            >
                              <Building2 className={iconClass("etablissement")} />
                              <input
                                type="text"
                                required
                                name="etablissement"
                                placeholder="Nom de l'établissement"
                                onFocus={() => setFocusedInput("etablissement")}
                                onBlur={() => setFocusedInput(null)}
                                className={inputClass("etablissement")}
                              />
                            </motion.div>
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.01 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            >
                              <Layers className={iconClass("type")} />
                              <input
                                type="text"
                                required
                                name="type"
                                placeholder="Type (restaurant, bar...)"
                                onFocus={() => setFocusedInput("type")}
                                onBlur={() => setFocusedInput(null)}
                                className={inputClass("type")}
                              />
                            </motion.div>
                          </div>

                          {/* Responsable + Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.01 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            >
                              <User className={iconClass("responsable")} />
                              <input
                                type="text"
                                required
                                name="responsable"
                                placeholder="Nom du responsable"
                                onFocus={() => setFocusedInput("responsable")}
                                onBlur={() => setFocusedInput(null)}
                                className={inputClass("responsable")}
                              />
                            </motion.div>
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.01 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            >
                              <Mail className={iconClass("email")} />
                              <input
                                type="email"
                                required
                                name="email"
                                placeholder="Adresse email"
                                onFocus={() => setFocusedInput("email")}
                                onBlur={() => setFocusedInput(null)}
                                className={inputClass("email")}
                              />
                            </motion.div>
                          </div>

                          {/* Adresse */}
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            <MapPin className={iconClass("adresse")} />
                            <input
                              type="text"
                              required
                              name="adresse"
                                placeholder="Adresse de l'établissement"
                              onFocus={() => setFocusedInput("adresse")}
                              onBlur={() => setFocusedInput(null)}
                              className={inputClass("adresse")}
                            />
                          </motion.div>

                          {/* Message */}
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.005 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            <MessageSquare
                              className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-300 ${focusedInput === "message" ? "text-lavande" : "text-white/30"}`}
                            />
                            <textarea
                              rows={3}
                              name="message"
                                placeholder="Dites-nous pourquoi vous souhaitez devenir partenaire... (optionnel)"
                              onFocus={() => setFocusedInput("message")}
                              onBlur={() => setFocusedInput(null)}
                              className={`w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-300 resize-none ${focusedInput === "message" ? "border-white/20 bg-white/[0.08]" : ""}`}
                            />
                          </motion.div>

                          {/* Bouton envoyer */}
                          {error && (
                            <p className="text-red-300 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                              {error}
                            </p>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative group/button mt-2"
                          >
                            <div className="absolute inset-0 gradient-bg rounded-lg blur-lg opacity-0 group-hover/button:opacity-40 transition-opacity duration-300" />
                            <div className="relative overflow-hidden gradient-bg py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{
                                  duration: 1.5,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                                style={{
                                  opacity: isLoading ? 1 : 0,
                                  transition: "opacity 0.3s ease",
                                }}
                              />
                              <AnimatePresence mode="wait">
                                {isLoading ? (
                                  <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                  >
                                    <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                                  </motion.div>
                                ) : (
                                  <motion.span
                                    key="text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-white text-sm font-semibold"
                                  >
                                    <Send className="w-4 h-4" />
                                    Envoyer ma demande
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
