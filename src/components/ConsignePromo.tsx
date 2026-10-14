"use client";

import { usePlateforme } from "@/lib/plateforme";

/**
 * Ce qu'il reste à faire après l'installation. Android : rien, Play rend le
 * code à l'app (`referrer`). iPhone : l'App Store ne transmet rien, le code est
 * copié au toucher du bouton et se colle dans « J'ai un code ».
 */
export default function ConsignePromo() {
  const plateforme = usePlateforme();
  return (
    <p className="text-white/70 text-base leading-relaxed mb-8">
      {plateforme === "android" ? (
        <>Installe Safe Back : <strong className="text-white">le code s&apos;applique tout seul</strong> à l&apos;inscription.</>
      ) : (
        <>Installe Safe Back, puis à l&apos;inscription touche <strong className="text-white">« J&apos;ai un code »</strong> et colle-le : il est copié quand tu installes.</>
      )}
    </p>
  );
}
