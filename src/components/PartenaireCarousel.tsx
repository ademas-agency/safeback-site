"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const pairs = [
  [
    { name: "Restaurants", src: "/restaurant.jpg" },
    { name: "Bars", src: "/bar.jpg" },
  ],
  [
    { name: "Pharmacies", src: "/pharmacie.jpg" },
    { name: "Librairie", src: "/librairie.jpg" },
  ],
];

export default function PartenaireCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % pairs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {pairs[index].map((item) => (
            <div
              key={item.name}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lavande shrink-0" />
                <p className="text-white font-medium text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
