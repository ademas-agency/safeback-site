"use client";

import { usePlateforme } from "@/lib/plateforme";
import { useNavigateurIntegre } from "@/lib/navigateur-integre";
import { lienSchemaInvitation } from "@/components/LienOuvrirApp";

/**
 * Dans le navigateur intégré de Snapchat, Instagram, TikTok… le lien
 * d'invitation n'ouvre pas l'app, même installée : ces navigateurs ignorent les
 * liens universels. On propose, dans l'ordre :
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
 */
export default function SortirNavigateurIntegre({ code }: { code: string }) {
  const app = useNavigateurIntegre();
  const plateforme = usePlateforme();
  if (!app || !code) return null;

  const page = `safe-back.fr/i/${code}`;
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
        href={lienSchemaInvitation(plateforme, code)}
        className="block w-full text-center rounded-xl bg-white text-nuit font-semibold py-3 mb-3"
      >
        Ouvrir l&apos;invitation dans Safe Back
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
