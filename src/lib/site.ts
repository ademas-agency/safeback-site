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
 * Fiche App Store de l'app, publiée le 2 octobre 2026. Utilisée par tous les
 * boutons « App Store » du site et par les pages `/i/<code>` et `/a/<id>`.
 */
export const APP_STORE_URL = "https://apps.apple.com/fr/app/safe-back/id6760755038";

/**
 * Lien de téléchargement de l'app, utilisé par la page d'invitation `/i/<code>`
 * et la page d'alerte `/a/<id>`.
 *
 * C'est le lien App Store, fixé ici dans le code et PLUS par une variable
 * d'environnement : avant la publication, `NEXT_PUBLIC_APP_DOWNLOAD_URL`
 * portait le lien TestFlight chez l'hébergeur, et une variable oubliée aurait
 * continué d'y envoyer les invités après la sortie sur le store. La variable
 * peut être supprimée chez l'hébergeur, elle n'est plus lue.
 */
export const APP_DOWNLOAD_URL = APP_STORE_URL;
