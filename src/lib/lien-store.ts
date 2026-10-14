import { APP_STORE_ID, APP_STORE_PROVIDER_TOKEN, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export type Appareil = "android" | "ios" | "autre";

/** Une source de campagne : lettres, chiffres, tirets. Tout le reste est ignoré. */
export function nettoyerSource(brut: string | null): string {
  const s = (brut ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  return s || "direct";
}

export function detecterAppareil(userAgent: string): Appareil {
  if (/Android/i.test(userAgent)) return "android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  return "autre";
}

/**
 * Le lien du store, porteur de la source.
 *
 * - Google Play : paramètre `referrer`, que Play remet à l'app installée et
 *   qu'il lit lui-même pour ses rapports d'acquisition (format UTM).
 * - App Store : lien de campagne `pt` + `ct` ; `ct` porte la source. Sans `pt`,
 *   Apple ne compte rien, mais le lien reste valide.
 * - Autre appareil : la page Télécharger, qui propose les deux stores.
 */
export function lienStore(appareil: Appareil, source: string): string {
  if (appareil === "android") {
    const referrer = `utm_source=${source}&utm_medium=lien&utm_campaign=app`;
    return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
  }
  if (appareil === "ios") {
    // La forme exacte produite par App Store Connect (« Générer un lien de
    // campagne ») : c'est celle qu'App Analytics sait rattacher à une campagne.
    return APP_STORE_PROVIDER_TOKEN
      ? `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${source}&mt=8`
      : APP_STORE_URL;
  }
  return "/telecharger";
}
