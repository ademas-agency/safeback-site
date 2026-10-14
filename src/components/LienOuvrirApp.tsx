"use client";

import { PLAY_STORE_URL } from "@/lib/site";
import { usePlateforme, type Plateforme } from "@/lib/plateforme";

/**
 * Lien qui ouvre l'invitation dans l'app sans passer par la validation du
 * lien web : `safeback://invite/<code>` sur iPhone ; sur Android un lien
 * `intent://`, la forme que Chrome documente pour ouvrir une app depuis une
 * page (un simple `safeback://` y est parfois ignoré sans un mot ; `intent://`
 * nomme le paquet, et retombe sur la fiche Play si l'app n'est pas là).
 */
export function lienSchema(plateforme: Plateforme, hote: "invite" | "promo", code: string): string {
  return plateforme === "android"
    ? `intent://${hote}/${code}#Intent;scheme=safeback;package=fr.safeback.app;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
    : `safeback://${hote}/${code}`;
}

/** « Tu as déjà l'app ? » — ouvre l'invitation dans l'app. */
export default function LienOuvrirApp({ code }: { code: string }) {
  const plateforme = usePlateforme();
  return (
    <a href={lienSchema(plateforme, "invite", code)} className="text-white font-semibold underline underline-offset-4 hover:text-lavande">
      Ouvrir l&apos;invitation dans Safe Back
    </a>
  );
}
