"use client";

import { PLAY_STORE_URL } from "@/lib/site";
import { usePlateforme } from "@/lib/plateforme";

/**
 * « Tu as déjà l'app ? » — ouvre l'invitation dans l'app, sans dépendre de la
 * validation du lien web par le téléphone.
 *
 * iPhone : le schéma interne `safeback://invite/<code>`, que l'app déclare.
 *
 * Android : un lien `intent://`, la forme que Chrome documente pour ouvrir
 * une app depuis une page. Un simple `safeback://` y est parfois ignoré sans
 * un mot ; `intent://` nomme le paquet, et retombe sur la fiche Play si l'app
 * n'est pas là. Autres navigateurs : le schéma interne, à défaut de mieux.
 */
export default function LienOuvrirApp({ code }: { code: string }) {
  const plateforme = usePlateforme();
  const href =
    plateforme === "android"
      ? `intent://invite/${code}#Intent;scheme=safeback;package=fr.safeback.app;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
      : `safeback://invite/${code}`;

  return (
    <a href={href} className="text-white font-semibold underline underline-offset-4 hover:text-lavande">
      Ouvrir l&apos;invitation dans Safe Back
    </a>
  );
}
