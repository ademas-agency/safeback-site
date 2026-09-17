import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
