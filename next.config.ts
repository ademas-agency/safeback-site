import type { NextConfig } from "next";
import { APP_STORE_URL, PLAY_STORE_URL } from "./src/lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Le lien « magasin » universel : safe-back.fr/app (alias /go).
      //
      // Un seul lien à imprimer, à mettre sur Instagram ou dans un SMS, qui
      // envoie chaque téléphone vers SON magasin — même rôle que go.lacachette.app,
      // mais sans domaine ni infrastructure à part : le site est déjà là.
      // Ordinateur ou appareil inconnu → la page Télécharger, qui propose les
      // deux. 307, pas 308 : un magasin ou un lien peut changer.
      ...["/app", "/go"].flatMap((source) => [
        {
          source,
          has: [{ type: "header" as const, key: "user-agent", value: ".*Android.*" }],
          destination: PLAY_STORE_URL,
          permanent: false,
        },
        {
          source,
          has: [{ type: "header" as const, key: "user-agent", value: ".*(iPhone|iPad|iPod).*" }],
          destination: APP_STORE_URL,
          permanent: false,
        },
        { source, destination: "/telecharger", permanent: false },
      ]),
      // L'ancienne adresse de la page de suppression, publiée quelques heures
      // le 18/09/2026 : la nouvelle couvre le compte ET les données.
      { source: "/suppression-compte", destination: "/suppression", permanent: true },
      // `www.safe-back.fr` → `safe-back.fr`, pour que le site n'existe qu'à une
      // adresse aux yeux des moteurs de recherche.
      //
      // SAUF `/.well-known/*` : les fichiers de liaison avec l'app (Apple et
      // Android) doivent être servis sur `www` AUSSI, sans aucune redirection.
      // L'app iOS déclare `applinks:www.safe-back.fr`, l'app Android vérifie
      // `www.safe-back.fr` séparément. Une 301 ici casserait les deux.
      //
      // Suppose que `www` est ajouté chez Vercel comme domaine SIMPLE du projet,
      // sans l'option « rediriger vers safe-back.fr » : la redirection de
      // Vercel s'appliquerait avant celle-ci, à `/.well-known/*` compris.
      {
        source: "/:path((?!\\.well-known(?:/|$)).*)",
        has: [{ type: "host", value: "www.safe-back.fr" }],
        destination: "https://safe-back.fr/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
