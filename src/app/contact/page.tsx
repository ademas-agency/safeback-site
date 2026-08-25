"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Send, CheckCircle, User, Mail, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

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

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Envoi REEL. Ce bloc simulait un succes au bout de 1,5 s sans rien transmettre :
  // la personne repartait convaincue d'avoir ecrit, et personne ne recevait rien.
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
        body: JSON.stringify({ ...data, sujet: "Contact" }),
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

  const inputClass = (name: string) =>
    `w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-300 ${focusedInput === name ? "border-white/20 bg-white/[0.08]" : ""}`;

  const iconClass = (name: string) =>
    `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${focusedInput === name ? "text-lavande" : "text-white/30"}`;

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20 min-h-screen relative overflow-hidden flex items-center justify-center">
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

        {/* ===== CARTE FORMULAIRE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative z-10 px-4"
          style={{ perspective: 1500 }}
        >
          <motion.div
            className="relative"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ z: 10 }}
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

              {/* Light beams voyageant sur les bords */}
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

              {/* Bordure glow au hover */}
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
                        Message envoyé !
                      </h3>
                      <p className="text-white/50 text-sm">
                        Nous avons bien reçu votre message. Notre équipe vous
                        répondra dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="relative">
                      {/* En-tête */}
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", duration: 0.8 }}
                          className="mx-auto w-11 h-11 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden mb-3"
                        >
                          <Mail className="w-5 h-5 text-lavande" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                        </motion.div>
                        <motion.h1
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                        >
                          Contactez-nous
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-white/40 text-xs mt-1"
                        >
                          Une question, une suggestion ou un partenariat ?
                          Écrivez-nous !
                        </motion.p>
                      </div>

                      {/* Formulaire */}
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            <User className={iconClass("prenom")} />
                            <input
                              type="text"
                              required
                              name="prenom"
                              placeholder="Prénom"
                              onFocus={() => setFocusedInput("prenom")}
                              onBlur={() => setFocusedInput(null)}
                              className={inputClass("prenom")}
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
                            <User className={iconClass("nom")} />
                            <input
                              type="text"
                              required
                              name="nom"
                              placeholder="Nom"
                              onFocus={() => setFocusedInput("nom")}
                              onBlur={() => setFocusedInput(null)}
                              className={inputClass("nom")}
                            />
                          </motion.div>
                        </div>

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
                            rows={4}
                            required
                            name="message"
                              placeholder="Votre message..."
                            onFocus={() => setFocusedInput("message")}
                            onBlur={() => setFocusedInput(null)}
                            className={`w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-300 resize-none ${focusedInput === "message" ? "border-white/20 bg-white/[0.08]" : ""}`}
                          />
                        </motion.div>

                        {/* Bouton envoyer */}
                        {/* Erreur affichee TELLE QUELLE : quand l'envoi echoue, on le dit. */}
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
                                  Envoyer le message
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
      </main>
      <Footer />
    </>
  );
}
