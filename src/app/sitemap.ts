import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Les pages du site, toutes statiques. À compléter si une page est ajoutée.
const ROUTES = [
  "", "/produit", "/offres", "/statistiques", "/partenaires",
  "/contact", "/telecharger", "/dispositif", "/cgu", "/confidentialite",
  "/suppression",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
