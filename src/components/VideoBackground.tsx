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
        // `object-contain` jusqu'a lg, `object-cover` au-dela.
        //
        // La video est composee POUR LE PAYSAGE : texte a gauche, telephone a
        // droite, en alternance. Recadree en 9/16 pour un ecran vertical, elle
        // perdait les deux — on ne voyait qu'une tranche centrale ou le texte
        // etait coupe en deux (« n toute tranquillit »). Aucun recadrage ne peut
        // sauver une composition large : on montre donc l'image ENTIERE, comme un
        // bloc 16/9 assume, et le fond de marque occupe le reste.
        className="absolute inset-0 h-full w-full object-contain object-top lg:object-cover brightness-[1.05]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
      >
        {/* UNE seule source, en H.264/MP4.
            J'avais ajoute une version WebM/VP9 en premiere source pour gagner
            300 Ko. A retirer : le support de VP9 sur iOS depend de l'appareil et
            de la version, et Safari peut annoncer savoir le lire puis n'afficher
            qu'un cadre noir. Trois cents kilo-octets ne valent pas un hero vide
            sur iPhone. Le MP4 720p reste deux fois et demie plus leger que la
            source d'origine (1,6 Mo contre 4 Mo en 1080p). */}
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Voile pour la lisibilité : quasi nul en haut (vidéo bien visible), sombre en bas pour le texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nuit/35 to-nuit/90" />
      {/* Teinte bleu/violet douce pour rester dans l'ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/10" />
    </div>
  );
}
