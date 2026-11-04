import type { NextConfig } from "next";

/**
 * Le blog est une application séparée, déployée par une autre équipe.
 *
 * Cette constante est l'UNIQUE point de contact entre les deux. Tout ce qui
 * commence par `/blog` est servi par leur déploiement ; tout le reste — les
 * pages du site, `/a/`, `/i/`, et surtout `/.well-known/` — reste ici et leur
 * est inaccessible, quoi qu'ils déploient. Un blog cassé ne casse que `/blog`.
 *
 * Non définie (développement local, préversion), les règles ci-dessous ne sont
 * pas posées du tout : `/blog` répond alors 404, ce qui est honnête.
 */
const BLOG = process.env.BLOG_DOMAIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!BLOG) return [];
    return [
      { source: "/blog", destination: `${BLOG}/blog` },
      { source: "/blog/:path+", destination: `${BLOG}/blog/:path+` },
      // Les fichiers statiques de leur application. Le préfixe `blog-static`
      // est déclaré de leur côté (`assetPrefix`) pour que leurs scripts et
      // leurs styles ne se mélangent jamais aux nôtres.
      { source: "/blog-static/:path+", destination: `${BLOG}/blog-static/:path+` },
    ];
  },

  async redirects() {
    return [
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
