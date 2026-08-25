"use client";

/**
 * Fond vidéo couvrant sa section parente (le hero).
 * La vidéo (muette, en boucle) tourne derrière le contenu ;
 * un voile dégradé assombrit le bas pour garder les textes lisibles.
 * Le parent doit être `position: relative`.
 */
export default function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-[1.05]"
        autoPlay
        loop
        muted
        playsInline
        // `metadata` et non `auto` : le fond est decoratif, il ne doit pas se
        // telecharger en entier avant le reste de la page. L'affiche couvre
        // l'attente.
        preload="metadata"
        poster="/video/hero-poster.jpg"
      >
        {/* WebM d'abord : 1,3 Mo contre 1,6 Mo pour le MP4, meme rendu. Les
            navigateurs qui ne le lisent pas tombent sur le MP4. La source
            d'origine pesait 4 Mo en 1080p pour un simple fond. */}
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Voile pour la lisibilité : quasi nul en haut (vidéo bien visible), sombre en bas pour le texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nuit/35 to-nuit/90" />
      {/* Teinte bleu/violet douce pour rester dans l'ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/10" />
    </div>
  );
}
