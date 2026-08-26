import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Indexation BLOQUÉE par défaut, le temps que les pages légales soient remplies.
 *
 * Les pages CGU et Confidentialité contiennent encore des champs entre crochets
 * (`[raison sociale]`, `[adresse e-mail]`, `[date de publication]`…). Laisser
 * Google les indexer en l'état, c'est risquer de les voir en cache et dans les
 * résultats pendant des semaines après correction — sur une application de
 * sécurité, dont la politique de confidentialité est un argument, ça coûte plus
 * cher que d'attendre quelques jours.
 *
 * Le site reste EN LIGNE et accessible par son adresse : seul le référencement
 * est suspendu.
 *
 * POUR OUVRIR L'INDEXATION : définir `NEXT_PUBLIC_ALLOW_INDEXING=true` chez
 * l'hébergeur, puis redéployer. Rien d'autre à changer.
 */
const ALLOW = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
