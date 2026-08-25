/**
 * Adresse publique du site, en UN seul endroit.
 *
 * Elle sert au sitemap, au robots.txt et aux métadonnées de partage (Open Graph) —
 * qui ont tous besoin d'URL ABSOLUES : un aperçu WhatsApp ou LinkedIn ne sait pas
 * résoudre un chemin relatif.
 *
 * À l'hébergement, définir `NEXT_PUBLIC_SITE_URL` (Vercel et Netlify le proposent
 * dans leurs réglages). Sans ça, la valeur par défaut ci-dessous s'applique : elle
 * est à corriger dès que le nom de domaine est connu.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://safeback.fr";

export const SITE_NAME = "SafeBack";

export const SITE_DESCRIPTION =
  "SafeBack est une application de sécurité personnelle. Partage de trajet en temps réel, alerte d'urgence en un geste, carte des lieux sûrs.";
