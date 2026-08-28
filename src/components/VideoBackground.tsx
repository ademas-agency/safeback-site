"use client";

import { useEffect, useState } from "react";

/**
 * Fond vidéo couvrant sa section parente (le hero).
 * La vidéo (muette, en boucle) tourne derrière le contenu ;
 * un voile dégradé assombrit le bas pour garder les textes lisibles.
 * Le parent doit être `position: relative`.
 */

// Deux montages, un par orientation. La version paysage est composée avec le
// texte à gauche et le téléphone à droite : recadrée pour un écran vertical, elle
// perdait les deux et le titre se retrouvait coupé en deux. La version verticale
// est composée pour le portrait — texte et téléphone centrés.
const PAYSAGE = { src: "/video/hero.mp4", poster: "/video/hero-poster.jpg" };
const PORTRAIT = { src: "/video/hero-vertical.mp4", poster: "/video/hero-vertical-poster.jpg" };

// Même seuil que le basculement de mise en page du hero (`lg` de Tailwind).
const LARGE = "(min-width: 1024px)";

export default function VideoBackground() {
  // Choix fait au NAVIGATEUR, pas en rendant les deux balises.
  //
  // Deux `<video>` masquées l'une ou l'autre en CSS, ou deux `<source media=…>`,
  // ne garantissent pas qu'un seul fichier soit téléchargé — et `media` sur
  // `<source>` n'est de toute façon pas fiable pour la vidéo. On n'expose donc
  // qu'une seule source, décidée après montage. L'affiche couvre ce court instant.
  const [choix, setChoix] = useState<typeof PAYSAGE | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(LARGE);
    const appliquer = () => setChoix(mq.matches ? PAYSAGE : PORTRAIT);
    appliquer();
    // Suit les rotations d'écran et les redimensionnements de fenêtre.
    mq.addEventListener("change", appliquer);
    return () => mq.removeEventListener("change", appliquer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video
        // `key` force le remplacement de l'élément quand la source change :
        // réaffecter `src` sur une balise déjà lancée ne relance pas la lecture.
        key={choix?.src ?? "attente"}
        className="absolute inset-0 h-full w-full object-cover brightness-[1.05]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={choix?.poster ?? PORTRAIT.poster}
      >
        {/* Chaque montage est servi dans son orientation native : plus aucun
            recadrage, donc `object-cover` sans perte. */}
        {choix && <source src={choix.src} type="video/mp4" />}
      </video>

      {/* Voile pour la lisibilité : quasi nul en haut (vidéo bien visible), sombre en bas pour le texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nuit/35 to-nuit/90" />
      {/* Teinte bleu/violet douce pour rester dans l'ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/10" />
    </div>
  );
}
