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

/**
 * Lien de téléchargement de l'app, utilisé par la page d'invitation `/i/<code>`.
 *
 * Aujourd'hui un lien TestFlight (« https://testflight.apple.com/join/… ») ;
 * à la publication, le remplacer par le lien App Store. Une seule valeur à
 * changer chez l'hébergeur : `NEXT_PUBLIC_APP_DOWNLOAD_URL`.
 *
 * Sans cette variable, le bouton renvoie vers la page Télécharger du site,
 * pour ne jamais laisser un bouton mort face à quelqu'un qui vient d'être
 * invité.
 */
export const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL?.trim() || "/telecharger";
