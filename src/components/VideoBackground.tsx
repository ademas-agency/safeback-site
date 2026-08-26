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
        {/* UNE seule source, en H.264/MP4 1080p — le fichier d'origine.
            Deux tentatives d'optimisation ont ete annulees, dans cet ordre :
            une version WebM/VP9 en premiere source (le support de VP9 sur iOS
            depend de l'appareil, Safari peut annoncer savoir le lire puis
            n'afficher qu'un cadre noir), puis une reduction en 720p CRF 30 qui
            a rendu le TEXTE INCRUSTE visiblement flou — le defaut le plus voyant
            possible sur une video dont le texte est le message.
            Compare a egalite : l'original est net, le 720p CRF 30 est mou, et un
            1080p CRF 26 serait PLUS LOURD que l'original pour un rendu inferieur.
            La source etait deja bien compressee (4 Mo pour 40 s en 1080p, ~790
            kbps) et elle demarre en lecture progressive (moov avant mdat). Il n'y
            avait rien a gagner. */}
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Voile pour la lisibilité : quasi nul en haut (vidéo bien visible), sombre en bas pour le texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nuit/35 to-nuit/90" />
      {/* Teinte bleu/violet douce pour rester dans l'ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 via-transparent to-violet/10" />
    </div>
  );
}
