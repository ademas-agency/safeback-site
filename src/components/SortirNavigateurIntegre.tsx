"use client";

import { useState } from "react";
import { usePlateforme } from "@/lib/plateforme";
import { useNavigateurIntegre } from "@/lib/navigateur-integre";
import { lienSchema } from "@/components/LienOuvrirApp";

/**
 * Dans le navigateur intégré de Snapchat, Instagram, TikTok… un lien
 * `safe-back.fr/i/…` ou `/p/…` n'ouvre pas l'app, même installée : ces
 * navigateurs ignorent les liens universels. On propose, dans l'ordre :
 *
 * 1. d'ouvrir l'app par son schéma interne, au toucher (certains de ces
 *    navigateurs l'acceptent, d'autres non — on ne le sait qu'en essayant) ;
 * 2. de sortir vers le vrai navigateur : `x-safari-https://` sur iPhone
 *    (iOS 17+), un `intent://` vers Chrome sur Android. Là, la page propose
 *    d'ouvrir l'app, et ça marche ;
 * 3. à défaut, le geste à la main : ⋯ › « Ouvrir dans le navigateur ».
 *
 * Rien d'automatique : sans geste de la personne, ces navigateurs bloquent
 * l'ouverture, et sur iPhone sans l'app, Safari afficherait une erreur.
 *
 * Snapchat bloque 1 ET 2 (constaté le 14/10/2026) : on n'y montre que le geste
 * à la main, avec une flèche vers les trois points, et de quoi copier le lien.
 */

/** Apps dont le navigateur refuse tout lien de sortie : seul le geste marche. */
const SANS_SORTIE = new Set(["Snapchat"]);
export default function SortirNavigateurIntegre({
  type,
  code,
}: {
  /** `invite` pour `/i/<code>`, `promo` pour `/p/<code>`. */
  type: "invite" | "promo";
  code: string;
}) {
  const app = useNavigateurIntegre();
  const plateforme = usePlateforme();
  const [copie, setCopie] = useState(false);
  if (!app || !code) return null;

  const page = `safe-back.fr/${type === "invite" ? "i" : "p"}/${code}`;

  if (SANS_SORTIE.has(app)) {
    const copier = async () => {
      try {
        await navigator.clipboard.writeText(`https://${page}`);
        setCopie(true);
      } catch {
        // Le lien reste affiché : il peut être sélectionné à la main.
      }
    };
    return (
      <>
        {/* Flèche vers les trois points du navigateur de Snapchat, en haut à droite. */}
        <div aria-hidden className="fixed top-2 right-3 z-50 flex flex-col items-end text-white animate-bounce">
          <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H9M17 7v8" />
          </svg>
        </div>
        <div className="w-full max-w-md mb-10 rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
          <p className="font-semibold mb-3">Tu as déjà Safe Back ?</p>
          <p className="text-white/70 text-sm mb-3">Snapchat n&apos;ouvre pas les apps. Pour l&apos;ouvrir :</p>
          <ol className="text-sm space-y-2 mb-4">
            <li><span className="font-bold text-lavande">1.</span> Touche les <strong>trois petits points</strong> en haut à droite</li>
            <li><span className="font-bold text-lavande">2.</span> Choisis <strong>« Ouvrir dans le navigateur »</strong></li>
          </ol>
          <button
            type="button" onClick={copier}
            className="block w-full text-center rounded-xl border border-white/25 font-semibold py-3"
          >
            {copie ? "Lien copié ✓ — colle-le dans Safari ou Chrome" : "Ou copier le lien"}
          </button>
        </div>
      </>
    );
  }
  const versNavigateur =
    plateforme === "android"
      ? { href: `intent://${page}#Intent;scheme=https;package=com.android.chrome;end`, libelle: "Ouvrir dans Chrome" }
      : { href: `x-safari-https://${page}`, libelle: "Ouvrir dans Safari" };

  return (
    <div className="w-full max-w-md mb-10 rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
      <p className="font-semibold mb-1">Tu as déjà Safe Back ?</p>
      <p className="text-white/70 text-sm mb-4">
        Le navigateur de {app} n&apos;ouvre pas les apps tout seul. Touche le bouton ci-dessous.
      </p>
      <a
        href={lienSchema(plateforme, type, code)}
        className="block w-full text-center rounded-xl bg-white text-nuit font-semibold py-3 mb-3"
      >
        {type === "invite" ? "Ouvrir l'invitation dans Safe Back" : "Ouvrir Safe Back avec le code"}
      </a>
      <a href={versNavigateur.href} className="block w-full text-center rounded-xl border border-white/25 font-semibold py-3">
        {versNavigateur.libelle}
      </a>
      <p className="text-white/50 text-xs mt-4">
        Rien ne s&apos;ouvre ? Touche <strong className="text-white/80">⋯</strong> en haut à droite, puis{" "}
        <strong className="text-white/80">« Ouvrir dans le navigateur »</strong>.
      </p>
    </div>
  );
}
